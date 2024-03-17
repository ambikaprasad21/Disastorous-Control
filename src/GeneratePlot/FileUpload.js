import { useEffect, useState } from "react";
import JSZip from "jszip";
import { DNA } from "react-loader-spinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./FileUpload.module.css";
import Button from "../utils/Button";

const BASE_URL = "https://py-server-for-codeindroome.onrender.com";
// const BASE_URL = "http://127.0.0.1:5000";

function FileUpload() {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [file, setFile] = useState(null);
  const [chartImage, setChartImage] = useState(null);
  const [describeImage, setDescribeImage] = useState(null);
  const [twoColumnChartImage, setTwoColumnChartImage] = useState(null);
  const [column1, setColumn1] = useState("");
  const [column2, setColumn2] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(function () {
    document.title = "GFG | Data Visualization";

    return function () {
      document.title = "Green For Green";
    };
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("There is no file");
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading1(true);
    setError1("");
    fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((zipBlob) => {
        const zipUrl = URL.createObjectURL(zipBlob);

        fetch(zipUrl)
          .then((zipResponse) => zipResponse.blob())
          .then((zipData) => {
            const zip = new JSZip();
            return zip.loadAsync(zipData);
          })
          .then((zip) => {
            zip
              .file("colored_chart.png")
              .async("blob")
              .then((coloredBlob) => {
                setChartImage(URL.createObjectURL(coloredBlob));
              });

            zip
              .file("describe_chart.png")
              .async("blob")
              .then((describeBlob) => {
                setDescribeImage(URL.createObjectURL(describeBlob));
              });
          });
      })
      .catch((error) => {
        setError1("There is some Error 🥲, Try again");
        console.error("Error:", error);
      })
      .finally(() => setIsLoading1(false));
  };

  const handleGenerateTwoColumnChart = async () => {
    if (!file) return alert("There is no file");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("column1", column1);
    formData.append("column2", column2);

    try {
      if (column1 && column2) {
        setIsLoading2(true);
        setError2("");
        const response = await fetch(`${BASE_URL}/generate_two_column_chart`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          console.log(blob);
          setTwoColumnChartImage(URL.createObjectURL(blob));
        }
      } else {
        alert("Both column names are required for a two-column chart");
      }
    } catch (err) {
      setError2("There is some Error 🥲, Try again");
      console.log(err);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.file}>
        <h1 className={styles["page-heading"]}>
          Data Visualization & Statistics
        </h1>

        <div className={styles["file-upload"]}>
          <input
            type="file"
            id="files"
            onChange={handleFileChange}
            accept=".csv"
            disabled={isLoading1 || isLoading2}
            className={`${styles.file_input} ${
              isLoading1 || isLoading2 ? styles.disable_input_file : ""
            }`}
          />
          <div className={styles["file-upload__text"]}>
            <p>.csv files</p>
            <p>Upload data file to see enhanced visulization</p>
          </div>
        </div>

        <div className={styles.instruction}>
          <h1>Instructions:</h1>
          <ol className={styles["outer-ol"]}>
            <li>
              Upload the data file in <strong>.csv</strong> format
            </li>
            <li>
              To see plot of all integer value columns use combined data
              visualization button
            </li>
            <li>
              To see plot of any two integer columns (how one changes with
              respect to other) of your data file follow below steps :-
              <ol className={styles["inner-ol"]}>
                <li>Write name of first column</li>
                <li>Write name of second column</li>
                <li>Use generate two column chart button</li>
              </ol>
              <p className={styles.note}>
                <span className={styles["note-label"]}>Note: </span>
                <strong>
                  Column names should be exactly same as in data file
                </strong>
              </p>
            </li>
          </ol>
        </div>

        <div className={styles["canvas"]}>
          <div className={styles["combined col"]}>
            <Button handleInput={handleUpload} disabled={isLoading1}>
              {isLoading1 ? "Generating..." : "Combined Data Visualization"}
            </Button>
            {isLoading1 && (
              <div className={styles.loader}>
                <DNA
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            )}

            {error1 && !isLoading1 && <p className={styles.error}>{error1}</p>}
            {chartImage && !isLoading1 && !error1 && (
              <img
                src={chartImage}
                alt="Colored Chart"
                className={styles.plot}
              />
            )}
            {describeImage && !isLoading1 && !error1 && (
              <img
                src={describeImage}
                alt="Describe Chart"
                className={styles.plot}
              />
            )}
          </div>
          <div className={styles["two-column col"]}>
            <div className={styles["input-and-button"]}>
              <div className={styles.input}>
                <div>
                  <label>Column 1: </label>
                  <input
                    type="text"
                    value={column1}
                    onChange={(e) => setColumn1(e.target.value)}
                    className={styles["col-value"]}
                  />
                </div>
                <div>
                  <label>Column 2: </label>
                  <input
                    type="text"
                    value={column2}
                    onChange={(e) => setColumn2(e.target.value)}
                    className={styles["col-value"]}
                  />
                </div>
              </div>
              <Button
                handleInput={handleGenerateTwoColumnChart}
                disabled={isLoading2}
              >
                {isLoading2 ? "Generating..." : "Generate Two-Column Chart"}
              </Button>
            </div>
            {isLoading2 && (
              <div className={styles.loader}>
                <DNA
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            )}

            {error2 && !isLoading2 && <p>{error2}</p>}
            {twoColumnChartImage && !isLoading2 && !error2 && (
              <img
                src={twoColumnChartImage}
                alt="Two-Column Chart"
                className={styles.plot}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FileUpload;

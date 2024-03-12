import { useState } from "react";
import JSZip from "jszip";
import Header from "../components/Header";
import styles from "./FileUpload.module.css";

function FileUpload() {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [file, setFile] = useState(null);
  const [chartImage, setChartImage] = useState(null);
  const [describeImage, setDescribeImage] = useState(null);
  const [twoColumnChartImage, setTwoColumnChartImage] = useState(null);
  const [column1, setColumn1] = useState("");
  const [column2, setColumn2] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("There is no file");
    const formData = new FormData();
    formData.append("file", file);

    // console.log(isLoading);
    setIsLoading1(true);
    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((zipBlob) => {
        const zipUrl = URL.createObjectURL(zipBlob);

        // Extract images from the zip file
        fetch(zipUrl)
          .then((zipResponse) => zipResponse.blob())
          .then((zipData) => {
            const zip = new JSZip();
            return zip.loadAsync(zipData);
          })
          .then((zip) => {
            // Get images from the zip file
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
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading1(false));

    // console.log(isLoading);

    // fetch("http://127.0.0.1:5000/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => Promise.all([response.blob(), response.blob()]))
    //   .then(([coloredChartBlob, describeChartBlob]) => {
    //     setChartImage(URL.createObjectURL(coloredChartBlob));
    //     setDescribeImage(URL.createObjectURL(describeChartBlob));
    //   })
    //   .catch((error) => console.error("Error:", error));

    // const response = await fetch("http://localhost:5000/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    //   setColoredChartPath(data.colored_chart_path);
    // }
    // if (response.ok) {
    //   const blob = await response.blob();
    //   setChartImage(URL.createObjectURL(blob));
    // }
  };

  const handleGenerateTwoColumnChart = async () => {
    if (!file) return alert("There is no file");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("column1", column1);
    formData.append("column2", column2);

    if (column1 && column2) {
      setIsLoading2(true);
      const response = await fetch(
        "http://localhost:5000/generate_two_column_chart",
        {
          method: "POST",
          body: formData,
        }
      );
      setIsLoading2(false);

      if (response.ok) {
        const blob = await response.blob();
        console.log(blob);
        setTwoColumnChartImage(URL.createObjectURL(blob));
      }
    } else {
      alert("Both column names are required for a two-column chart");
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
            onChange={handleFileChange}
            accept=".csv"
            disabled={isLoading1}
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
            <button
              onClick={handleUpload}
              className={styles.btn}
              disabled={isLoading1}
            >
              {isLoading1 ? "Loading..." : "Combined Data Visualization"}
            </button>
            {chartImage && !isLoading1 && (
              <img
                src={chartImage}
                alt="Colored Chart"
                className={styles.plot}
              />
            )}
            {describeImage && !isLoading1 && (
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
              <button
                onClick={handleGenerateTwoColumnChart}
                className={styles.btn}
                disabled={isLoading2}
              >
                {isLoading2 ? "Loading..." : "Generate Two-Column Chart"}
              </button>
            </div>

            {twoColumnChartImage && !isLoading2 && (
              <img
                src={twoColumnChartImage}
                alt="Two-Column Chart"
                className={styles.plot}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUpload;

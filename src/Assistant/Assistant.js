import { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import Tesseract from "tesseract.js";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Assistant.module.css";
import Button from "../utils/Button";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

function Assistant() {
  const [image, setImage] = useState(sessionStorage.getItem("image") || null);
  const [imageText, setImageText] = useState(
    sessionStorage.getItem("imageText") || null
  );

  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingAns, setIsLoadingAns] = useState(false);
  const [answer, setAswer] = useState(sessionStorage.getItem("answer") || null);

  const [row, setRow] = useState(5);
  const [cols, setCols] = useState(100);
  const apiKey = process.env.REACT_APP_openai_api;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 330) {
        setCols(30);
      } else if (window.innerWidth <= 655) {
        setCols(35);
      } else if (window.innerWidth <= 750) {
        setCols(60);
      } else if (window.innerWidth <= 1030) {
        setCols(80);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageText(null);
    setImage(imageUrl);

    try {
      setIsLoadingText(true);
      const { data } = await Tesseract.recognize(imageUrl, "eng");
      const prompt = data.text.trim();

      setImageText(prompt);
      sessionStorage.setItem("image", imageUrl);
      sessionStorage.setItem("imageText", prompt);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoadingText(false);
    }
  };

  const handleGenerateSolution = async () => {
    if (!imageText) {
      return alert(
        "No question text found. Please input question text or image file"
      );
    }

    try {
      setIsLoadingAns(true);
      setAswer(null);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          // model: "gpt-4-turbo-preview",
          // model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "system",
              content:
                "Provide Solution To chemical Engineering Numerical Problem. Explain with proper mathematical equations",
            },
            { role: "user", content: imageText },
          ],
          max_tokens: 1500,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.choices[0].message.content.trim());
      const generatedSolution = data.choices[0].message.content;
      setAswer(generatedSolution);
      sessionStorage.setItem("answer", generatedSolution);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingAns(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.containerhead}>Ask Question From AI</h1>

        <div className={styles.alldiv}>
          <p className={styles.note}>
            Please select image file or enter problem in question text
          </p>
          <div className={styles.imginput}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`${styles.file_input} ${
                isLoadingAns ? styles.disable_input_file : ""
              }`}
            />
            <div className={styles["file-upload__text"]}>
              <p>Upload problem image</p>
            </div>
          </div>

          {image && (
            <img src={image} alt="question" className={styles.quesimg} />
          )}

          <div className={styles["img-text"]}>
            {isLoadingText ? (
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
            ) : (
              <div className={styles["ques-text"]}>
                <label>Question Text:</label>
                <textarea
                  rows={row}
                  cols={cols}
                  type="text"
                  value={imageText}
                  onChange={(e) => setImageText(e.target.value)}
                />
              </div>
            )}
          </div>

          {!answer && isLoadingAns && (
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          )}

          {answer && (
            <div>
              <h1 className={styles.solheading}>Solution:</h1>

              {answer.split("\n").map((line, index) => (
                <div key={index} className={styles.answer}>
                  <MathJaxContext config={config}>
                    <MathJax>{line}</MathJax>
                  </MathJaxContext>
                </div>
              ))}
            </div>
          )}
          <div>
            <Button
              handleInput={handleGenerateSolution}
              isLoading={isLoadingAns}
            >
              Generate Solution
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Assistant;

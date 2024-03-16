import { useState } from "react";
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
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState(null);

  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingAns, setIsLoadingAns] = useState(false);
  const [answer, setAswer] = useState(null);

  const apiKey = process.env.REACT_APP_openai_api;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageText(null);
    setImage(imageUrl);

    try {
      setIsLoadingText(true);
      const { data } = await Tesseract.recognize(imageUrl, "eng");
      const prompt = data.text.trim();
      //   console.log(prompt);
      setImageText(prompt);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoadingText(false);
    }
  };

  async function handleGenerateSolution() {
    try {
      setIsLoadingAns(true);
      setAswer(null);

      // Make a request to OpenAI API to generate solution
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Provide helpful solution to the engineering numerical problems",
            },
            { role: "user", content: imageText },
          ],
          // prompt: imageText,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.choices[0].message.content.trim());
      const generatedSolution = data.choices[0].message.content;

      // setAswer(
      //   `data:text/plain;charset=utf-8,${encodeURIComponent(generatedSolution)}`
      // );
      setAswer(generatedSolution);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingAns(false);
    }
    // try {
    //   //   setIsLoading(true);
    //   //   const { data } = await Tesseract.recognize(image, "eng");
    //   //   const prompt = data.text.trim();
    //   //   console.log(prompt);
    //   //   setImageText(prompt);
    // } catch (err) {
    //   console.log(err.message);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.containerhead}>Ask Question From AI</h1>

        <div className={styles.alldiv}>
          <p className={styles.note}>
            <strong>Note: </strong>Please select image file or enter problem in
            question text
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
              <>
                <label>Question Text:</label>
                <textarea
                  rows={5}
                  cols={50}
                  type="text"
                  value={imageText}
                  onChange={(e) => setImageText(e.target.value)}
                />
              </>
            )}
          </div>

          {/* {!answer && (
            <div>
              <p>Answer Screen</p>
            </div>
          )} */}

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
              {/* <img src={answer} alt="answer" /> */}
              {/* <p>{answer}</p> */}
              {/* <MathJaxContext
                config={{
                  displayAlign: "center",
                  displayIndent: "2em",
                  tex: {
                    packages: ["base", "ams"],
                    tags: "ams",
                  },
                }}
              >
                <MathJax>{answer}</MathJax>
              </MathJaxContext> */}

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
              isLoading={!image || isLoadingAns}
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

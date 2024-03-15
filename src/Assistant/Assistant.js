import { useState } from "react";
import { DNA } from "react-loader-spinner";
import Tesseract from "tesseract.js";

import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Assistant.module.css";
import Button from "../utils/Button";

function Assistant() {
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState(null);

  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingAns, setIsLoadingAns] = useState(false);
  const [answer, setAswer] = useState("");

  const apiKey = process.env.REACT_APP_openai_api;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  //   const apiUrl =
  //     "https://api.openai.com/v1/engines/text-davinci-002/completions";

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
      console.log(apiKey);
      setIsLoadingAns(true);

      // Make a request to OpenAI API to generate solution
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          prompt: imageText,
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      console.log(data);
      //   const generatedSolution = data.choices[0].text.trim();

      // Convert the text solution into an image
      // Here you would use a library or service to render text as an image

      // For demonstration, we'll set the text as the image text
      // setImageText(generatedSolution);
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
        <h1>Ask Question From AI</h1>

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

          {!answer && (
            <div>
              <p>Answer Screen</p>
            </div>
          )}

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
              <p>Answer</p>
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

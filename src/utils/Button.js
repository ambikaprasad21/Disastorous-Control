import { useState } from "react";
import styles from "./Button.module.css";

function Button({ handleInput, isLoading, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`${styles.button} ${hovered ? styles.hovered : ""}`}
      onClick={handleInput}
      disabled={isLoading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

export default Button;

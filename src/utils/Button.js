import { useState } from "react";
import styles from "./Button.module.css";

function Button({ genPlot, isLoading, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`${styles.button} ${hovered ? styles.hovered : ""}`}
      onClick={genPlot}
      disabled={isLoading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

export default Button;

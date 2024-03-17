import styles from "./ButtonCalci.module.css";

function ButtonCalci({ handleSolve }) {
  return (
    <button onClick={handleSolve} className={styles.btn}>
      Calculate
    </button>
  );
}

export default ButtonCalci;

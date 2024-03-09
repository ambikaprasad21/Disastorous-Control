import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles[`header-section`]}>
      <header className={styles.header}>
        <Link style={{ textDecoration: "none", cursor: "pointer" }} to={"/"}>
          <div className={styles["logo-container"]}>
            <img src="images/Logo.jpg" alt="Logo" className={styles.logo} />
          </div>
        </Link>

        <nav className={styles["nav-bar"]}>
          <ul>
            <li>Chemical Calculator</li>
            <li>
              <Link
                to={"/data-visulization"}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                File Upload
              </Link>{" "}
            </li>
            <li>Chemical E-commerce</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;

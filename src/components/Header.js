import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles[`header-section`]}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
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

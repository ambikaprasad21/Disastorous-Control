import { Link, NavLink } from "react-router-dom";
// import { IonIcon } from "@ionic/react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      className={`${styles["header-section"]} ${
        navOpen ? styles["menu-open"] : ""
      }`}
    >
      <header
        className={`${styles.header} ${navOpen ? styles["nav-open"] : ""}`}
      >
        <div className={styles["logo-container"]}>
          <Link to="/">
            <img
              src="./images/logo_nobg.png"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
          <p className={styles.title}>GreenForGreen</p>
        </div>

        <nav className={styles["nav-bar"]}>
          <ul className={styles["nav-list"]}>
            <li>
              <NavLink to={"/chemical-calculator"}>Chemical Calculator</NavLink>
            </li>
            <li>
              <NavLink to={"/data-visulization"}>File Upload</NavLink>
            </li>
            {/* <li>
              <NavLink to={"/chemical-market"}>Chemical E-Commerce</NavLink>
            </li>
            <li>
              <NavLink to={"/sign-up"}>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li> */}
          </ul>
        </nav>

        <button
          className={styles["btn-mobile-nav"]}
          onClick={() => setNavOpen((e) => !e)}
        >
          <p
            className={`${styles["icon-mobile-nav"]} ${
              navOpen ? styles.open : styles.close
            }`}
          >
            <FontAwesomeIcon icon={navOpen ? faXmark : faBars} />
          </p>
        </button>
      </header>
    </div>
  );
};
export default Header;

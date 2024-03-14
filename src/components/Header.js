import { Link, NavLink } from "react-router-dom";
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
      <header className={`${styles.header} `}>
        <div className={styles["logo-container"]}>
          <Link to="/">
            <img
              src="images/logo_nobg.png"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        <nav className={styles["nav-bar"]}>
          <ul>
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
      </header>
    </div>
  );
};
export default Header;

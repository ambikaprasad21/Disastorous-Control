import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles[`header-section`]}>
      <header className={styles.header}>
        <div className={styles["logo-container"]}>
          <img src="images/Logo.jpg" alt="Logo" className={styles.logo} />
        </div>
        <nav className={styles["nav-bar"]}>
          <ul>
            <li>Chemical Calculator</li>
            <li>File Upload</li>
            <li>Chemical E-commerce</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;

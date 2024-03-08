import styles from "./Navbar.module.css";

function Navbar() {
  return (
    // <div className={styles.nav_sec}>
    <div className={styles.navbar}>
      <h1>Logo</h1>
      <nav>
        <ul className={styles["nav-item"]}>
          <li>
            <a href="#">Chemical Calculator</a>
          </li>
          <li>
            <a href="#">File Upload</a>
          </li>
          <li>
            <a href="#">Chemical E-commerce</a>
          </li>
        </ul>
      </nav>
    </div>
    // </div>
  );
}

export default Navbar;

import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.section}>
      <div className={styles.logo}>
        <img
          src="/images/logo_nobg.png"
          alt="Logo"
          className={styles.logoImg}
        />
        <p className={styles.title}>GreenForGreen</p>
      </div>

      <div className={styles.info}>
        <div className={styles.fast}>
          <h2 className={styles.footerHeading}>Fast Links</h2>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/chemical-calculator"}>Chemical Calculator</NavLink>
            </li>
            <li>
              <NavLink to={"/data-visulization"}>File Upload</NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h2 className={styles.footerHeading}>Contact Us</h2>
          <ul>
            <li>
              <a href="https://www.tiktok.com/about">
                <img
                  src="/images/footer-logo/tik-tok.png"
                  className={styles.contactImg}
                  alt="Tik-tok"
                ></img>
              </a>
            </li>
            <li>
              <a href="https://github.com/ABHI2ME/Disastorous-Control">
                <img
                  src="/images/footer-logo/github.png"
                  className={styles.contactImg}
                  alt="Github"
                ></img>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/sujeet_patel_45/">
                <img
                  src="/images/footer-logo/instagram.png"
                  className={styles.contactImg}
                  alt="instagram"
                ></img>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/MNNITALLD">
                <img
                  src="/images/footer-logo/twitter.png"
                  className={styles.contactImg}
                  alt="twitter"
                ></img>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

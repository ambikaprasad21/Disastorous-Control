import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.section}>

         <div className={styles.logo}>
          <img src="images/logo_nobg.png" alt="Logo" className={styles.logoImg} />
          <p className={styles.title}>GreenForGreen</p>
         </div>

         <div className={styles.info}>
            <div className={styles.fast}>
            <h2>Fast Links</h2> 
            <ul>
              <li>Home</li>
              <li>Chemical Calculator</li>
              <li>File Upload</li>
            </ul>
            </div>

            <div className={styles.contact}>
                <h2>Contact Us</h2>
                <ul>
                  <li>
                    <a href="https://www.tiktok.com/about" >
                    <img src="images/footer-logo/black.png"></img>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/ABHI2ME/Disastorous-Control">
                      <img src="images/footer-logo/github.png"></img>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/sujeet_patel_45/">
                    <img src="images/footer-logo/instagram.png"></img>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/MNNITALLD">
                      <img src="images/footer-logo/black.png"></img> 
                    </a>
                  </li>
                </ul>
            </div>
         </div>
    </div>
  );
}

export default Footer;

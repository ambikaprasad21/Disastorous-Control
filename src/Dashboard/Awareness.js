import { motion } from "framer-motion";

import AwarenessSlider from "../components/AwarenessSlider";
import styles from "./Awareness.module.css";
import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";

function Awareness() {
  const AwarenessComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      const element = document.getElementById("awareness");
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <div className="content">
        {/* Your other content here */}

        <Element
          name="awareness"
          className={`awareness ${isVisible ? "visible" : "hidden"}`}
        >
          Awareness
        </Element>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      className={styles.section}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.2 },
        }}
      >
        AWARENESS
      </motion.h1>
      <AwarenessSlider />
    </motion.div>
    // <div className={styles.section}>
    //   <h1>AWARENESS</h1>
    //   <AwarenessSlider />
    // </div>
  );
}

export default Awareness;

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import AwarenessSlider from "../components/AwarenessSlider";
import styles from "./Awareness.module.css";
import React, { useEffect, useState } from "react";

function Awareness() {
  // const AwarenessComponent = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // const handleScroll = () => {
  //   const element = document.getElementById("awareness");
  //   if (element) {
  //     const rect = element.getBoundingClientRect();
  //     setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  //   return (
  //     <div className="content">
  //       {/* Your other content here */}

  //       <Element name="awareness" className="awareness">
  //         Awareness
  //       </Element>
  //     </div>
  //   );
  // };

  // const containerVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  // };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, duration: 0.7 },
      });
    }
  }, [inView, controls]);

  return (
    <motion.div className={styles.section}>
      <motion.h1 ref={ref} animate={controls} initial={{ opacity: 0, y: 70 }}>
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

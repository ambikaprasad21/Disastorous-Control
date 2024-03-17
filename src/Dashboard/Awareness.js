import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import AwarenessSlider from "../components/AwarenessSlider";
import styles from "./Awareness.module.css";
import React, { useEffect } from "react";

function Awareness() {
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
  );
}

export default Awareness;

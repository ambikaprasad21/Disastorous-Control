import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./ChemicalCalci.module.css";
import { useEffect, useState } from "react";

function ChemicalCalci() {
  const [select, setSelect] = useState(false);

  useEffect(function () {
    document.title = "GFG | Chemical Calculator";

    return function () {
      document.title = "Green For Green";
    };
  });
  return (
    <>
      <Header />
      <h1 className={styles.heading}>Chemical Calculator</h1>
      <div className={styles.section}>
        <div className={styles.options} onClick={() => setSelect(true)}>
          <NavLink
            to={"reaction-kinetics"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Reaction kinetics
          </NavLink>

          <NavLink
            to={"mass-transfer"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Mass transfer
          </NavLink>
          <NavLink
            to={"heat-transfter"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Heat Transfer
          </NavLink>
          <NavLink
            to={"thermodynamics"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Thermodynamics
          </NavLink>
          <NavLink
            to={"fluid-flow-calculations"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Fluid Flow
          </NavLink>
          <NavLink
            to={"reactor-design"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Reactor Design
          </NavLink>
        </div>
        <div className={styles["calci-bg"]}>
          <div className={styles["calci-area"]}>
            {!select && (
              <p className={styles["empty-outlet"]}>
                CHOOSE TOPIC FROM LIST TO START🧮
              </p>
            )}
            <Outlet />
          </div>
        </div>
        <div className={styles.ai}>
          <Link
            to="/ai-assistant"
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "inherit",
            }}
            className={styles["ai-text"]}
          >
            ASK AI
          </Link>
        </div>
      </div>
      <button></button>
      <Footer />
    </>
  );
}

export default ChemicalCalci;

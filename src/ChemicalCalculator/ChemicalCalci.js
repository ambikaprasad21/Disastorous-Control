import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./ChemicalCalci.module.css";
import { useEffect } from "react";

function ChemicalCalci() {
  useEffect(function () {
    document.title = "GFG | Chemical Calculator";

    return function () {
      document.title = "Green For Green";
    };
  });
  return (
    <>
      <Header />
      <div className={styles.section}>
        <div className={styles.options}>
          <Link
            to={"reaction-kinetics"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Reaction kinetics
          </Link>
          <Link
            to={"distillaion"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Distillaion
          </Link>
          <Link
            to={"mass-transfer"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Mass transfer
          </Link>
          <Link
            to={"heat-transfter"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Heat Transfer
          </Link>
          <Link
            to={"thermodynamics"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Thermodynamics
          </Link>
          <Link
            to={"fluid-flow-calculations"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Fluid Flow Calculations
          </Link>
          <Link
            to={"reactor-design"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Reactor Design
          </Link>
          <Link
            to={"mass-energy-balance"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Mass Energy Balance
          </Link>
        </div>
        <div className={styles["calci-bg"]}>
          <div className={styles["calci-area"]}>
          
            <Outlet />
          </div>
        </div>
      </div>
      <button></button>
      <Footer />
    </>
  );
}

export default ChemicalCalci;

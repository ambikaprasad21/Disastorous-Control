import { Link, NavLink, Outlet } from "react-router-dom";
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
      <h1 className={styles.heading}>Chemical Calculator</h1>
      <div className={styles.section}>
        
        <div className={styles.options}>
          <NavLink
            to={"reaction-kinetics"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              
            }}
          >
            Reaction kinetics
          </NavLink>
          {/* <Link
            to={"distillaion"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Distillaion
          </Link> */}
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
          {/* <Link
            to={"mass-energy-balance"}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Mass Energy Balance
          </Link> */}
        </div>
        <div className={styles["calci-bg"]}>
          <div className={styles["calci-area"]}>
          
            <Outlet />
          </div>
        </div>
        <div className={styles.ai}><Link to='/ai-assistant' style={{textDecoration: "none", cursor: "pointer" , color: "inherit"}} className={styles['ai-text']}>Ask AI</Link></div>
      </div>
      <Footer />
    </>
  );
}

export default ChemicalCalci;

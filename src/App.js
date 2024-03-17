import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import FileUpload from "./GeneratePlot/FileUpload";
import { PositionProvider } from "./Contexts/PositionContext";
import ChemicalCalci from "./ChemicalCalculator/ChemicalCalci";
import ReactionKinetics from "./ChemicalCalculator/ReactionKinetics";

import RateConstant from "./ReactionCalculator/RateConstant";
import TotalTime from "./ReactionCalculator/TotalTime";
import HalfLife from "./ReactionCalculator/HalfLife";
import MolarFlux from "./MassTransferCalculator/MolarFlux";
import EquimolarDiffusion from "./MassTransferCalculator/EquimolarDiffusion";
import MassTransfer from "./ChemicalCalculator/MassTransfer";
import Conduction from "./Heat Transfer Calculator/conduction";
import Convection from "./Heat Transfer Calculator/convection";
import Radiation from "./Heat Transfer Calculator/radiation";
import HeatTransfer from "./ChemicalCalculator/HeatTransfer";
import Thermodynamics from "./ChemicalCalculator/Thermodynamics";

import Isochoric from "./ThermodynamicCalculator/Isochoric";
import Isothermal from "./ThermodynamicCalculator/Isothermal";
import Isobaric from "./ThermodynamicCalculator/Isobaric";
import Adiabatic from "./ThermodynamicCalculator/Adiabatic";
import Assistant from "./Assistant/Assistant";
import Reynolds from "./FluidFlowCalculator/Reynolds";
import Velocity from "./FluidFlowCalculator/Velocity";
import MaxVelocity from "./FluidFlowCalculator/MaxVelocity";

import Fluid from "./ChemicalCalculator/Fluid";
import SpaceTimeCSTR from "./ReactorDesignCalculator/SpaceTimeCSTR";
import SpaceTimePFR from "./ReactorDesignCalculator/SpaceTimePFR";
import ReactorDesign from "./ChemicalCalculator/ReactorDesign";

function App() {
  return (
    <PositionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="data-visulization" element={<FileUpload />} />
          <Route path="chemical-calculator" element={<ChemicalCalci />}>
            <Route path="reaction-kinetics" element={<ReactionKinetics />}>
              <Route path="rate-constant" element={<RateConstant />} />
              <Route path="half-life" element={<HalfLife />} />
              <Route path="time-taken" element={<TotalTime />} />
            </Route>

            <Route path="mass-transfer" element={<MassTransfer />}>
              <Route path="molar-flux" element={<MolarFlux />} />
              <Route
                path="equimolar-counter-diffusion"
                element={<EquimolarDiffusion />}
              />
            </Route>

            <Route path="heat-transfter" element={<HeatTransfer />}>
              <Route path="conduction" element={<Conduction />} />
              <Route path="convection" element={<Convection />} />
              <Route path="radiation" element={<Radiation />} />
            </Route>

            <Route path="thermodynamics" element={<Thermodynamics />}>
              <Route path="Isochoric-work" element={<Isochoric />} />
              <Route path="Isothermal-work" element={<Isothermal />} />
              <Route path="Isobaric-work" element={<Isobaric />} />
              <Route path="Adiabatic-work" element={<Adiabatic />} />
            </Route>

            <Route path="fluid-flow-calculations" element={<Fluid />}>
              <Route path="Reynolds" element={<Reynolds />} />
              <Route path="Velocity" element={<Velocity />} />
              <Route path="Max-Velocity" element={<MaxVelocity />} />
            </Route>

            <Route path="reactor-design" element={<ReactorDesign />}>
              <Route path="Space-Time-CSTR" element={<SpaceTimeCSTR />} />
              <Route path="Space-Time-PFR" element={<SpaceTimePFR />} />
            </Route>
          </Route>
          <Route path="ai-assistant" element={<Assistant />} />
        </Routes>
      </BrowserRouter>
    </PositionProvider>
  );
}

export default App;

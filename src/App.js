import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import FileUpload from "./GeneratePlot/FileUpload";
import { PositionProvider } from "./Contexts/PositionContext";
import ChemicalCalci from "./ChemicalCalculator/ChemicalCalci";
import ReactionKinetics from "./ChemicalCalculator/ReactionKinetics";
import Market from "./Ecommerce/Market";

function App() {
  return (
    <PositionProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="data-visulization" element={<FileUpload />} />
          <Route path="chemical-calculator" element={<ChemicalCalci />}>
            <Route path="reaction-kinetics" element={<ReactionKinetics />} />
            <Route path="distillaion" element={<p>Distillaion</p>} />
            <Route path="mass-transfer" element={<p>Mass transfer</p>} />
            <Route path="heat-transfter" element={<p>Heat Transfer</p>} />
            <Route path="thermodynamics" element={<p>Thermodynamics</p>} />
            <Route
              path="fluid-flow-calculations"
              element={<p>Fluid Flow Calculations</p>}
            />
            <Route path="reactor-design" element={<p>Reactor Design </p>} />
            <Route
              path="mass-energy-balance"
              element={<p>Mass Energy Balance</p>}
            />
          </Route>
          {/* <Route path="chemical-market" element={<Market />} /> */}
        </Routes>
      </BrowserRouter>
    </PositionProvider>
  );
}

export default App;

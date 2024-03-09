import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import FileUpload from "./GeneratePlot/FileUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="data-visulization" element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

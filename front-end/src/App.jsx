import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Empleados from "./pages/Empleados";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/empleados" element={<Empleados></Empleados>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Empleados from "./pages/Empleados";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/empleados" element={<Empleados></Empleados>}></Route>
        <Route path="/productos" element={<Productos></Productos>}></Route>
        <Route path="/clientes" element={<Clientes></Clientes>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

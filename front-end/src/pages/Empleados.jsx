import { useEffect, useState } from "react";
import EmpleadosCard from "../components/EmpleadosCard";
import Navbar from "../components/Navbar";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/employees");
      if (!response.ok) throw new Error("Error al cargar empleados");
      const data = await response.json();
      setEmpleados(data);
      console.log(empleados);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const borrarEmpleado = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/employees/${id}`, {
        method: "DELETE",
      });
      fetchEmpleados();
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al borrar empleado:", error);
    }
  };

  const actualizarEmpleado = (empleado) => {
    console.log("Actualizar empleado:", empleado);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);
  if (loading) return <h1> Cargando...</h1>;

  return (
    <>
      <Navbar titulo="Empleados"></Navbar>

      <div className="container">
        <div className="row">
          {empleados.map((empleado) => (
            <div className="col-md-4" key={empleado.id}>
              <EmpleadosCard
                empleado={empleado}
                borrarEmpleado={() => borrarEmpleado(empleado._id)}
                actualizarEmpleado={() => actualizarEmpleado(empleado)}
              />
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary rounded-circle"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "60px",
            height: "60px",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
          onClick={() => {
            // Acción al hacer clic, como abrir un modal o redirigir
            console.log("FAB presionado");
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Empleados;

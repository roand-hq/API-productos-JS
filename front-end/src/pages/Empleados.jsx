import { useEffect, useState } from "react";
import EmpleadosCard from "../components/EmpleadosCard";
import Navbar from "../components/Navbar";
import { Modal, Button, Form } from "react-bootstrap";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    name: "",
    lastName: "",
    email: "",
    birthday: "",
    phone: "",
    address: "",
    hireDate: "",
    isssNumber: "",
  });

  const fetchEmpleados = async () => {
    try {
      const response = await fetch("https://api-productos-js-1.onrender.com/api/employees");
      if (!response.ok) throw new Error("Error al cargar empleados");
      const data = await response.json();
      setEmpleados(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const borrarEmpleado = async (id) => {
    try {
      await fetch(`https://api-productos-js-1.onrender.com/api/employees/${id}`, {
        method: "DELETE",
      });
      fetchEmpleados(); // Actualiza la lista después de borrar
    } catch (error) {
      console.error("Error al borrar empleado:", error);
    }
  };

  const actualizarEmpleado = (empleado) => {
    setNuevoEmpleado({
      name: empleado.name,
      lastName: empleado.lastName,
      email: empleado.email,
      birthday: empleado.birthday ? empleado.birthday.slice(0, 10) : "",
      phoneNumber: empleado.phoneNumber,
      address: empleado.address,
      hireDate:
        empleado.hireDate || empleado.hiringDate
          ? new Date(empleado.hireDate || empleado.hiringDate)
              .toISOString()
              .slice(0, 10)
          : "",
      isssNumber: empleado.isssNumber || empleado.Isss,
      _id: empleado._id, // guardar el id para luego hacer el PUT
    });
    setModoEdicion(true);
    setShowModal(true);
  };
  const guardarCambiosEmpleado = async () => {
    try {
      const res = await fetch(
        `https://api-productos-js-1.onrender.com/api/employees/${nuevoEmpleado._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoEmpleado),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar empleado");

      setShowModal(false);
      setModoEdicion(false);
      setNuevoEmpleado({
        name: "",
        lastName: "",
        email: "",
        birthday: "",
        phoneNumber: "",
        address: "",
        hireDate: "",
        isssNumber: "",
      });
      fetchEmpleados(); // recarga la lista actualizada
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
    }
  };
  const crearEmpleado = async () => {
    try {
      const res = await fetch("https://api-productos-js-1.onrender.com/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEmpleado),
      });
      if (!res.ok) throw new Error("Error al crear empleado");
      setShowModal(false);
      setNuevoEmpleado({
        name: "",
        lastName: "",
        email: "",
        birthday: "",
        phoneNumber: "",
        address: "",
        hireDate: "",
        isssNumber: "",
      });
      fetchEmpleados();
    } catch (error) {
      console.error("Error al crear empleado:", error);
    }
  };
  const cerrarModal = () => {
    setShowModal(false);
    setNuevoEmpleado({
      name: "",
      lastName: "",
      email: "",
      birthday: "",
      phoneNumber: "",
      address: "",
      hireDate: "",
      isssNumber: "",
    });
    setModoEdicion(false);
  };
  useEffect(() => {
    fetchEmpleados();
  }, []);

  if (loading) return <h1> Cargando...</h1>;

  return (
    <>
      <Navbar titulo="Empleados" />

      <div className="container" style={{ paddingTop: "50px" }}>
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

        {/* FAB */}
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
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>

      {/* Modal para agregar nuevo empleado */}
      <Modal show={showModal} onHide={() => cerrarModal()}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: modoEdicion ? "#ffc107" : "#0d6efd", color: "white" }}
        >
          <Modal.Title>
            {modoEdicion ? "Actualizar empleado" : "Agregar empleado"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Nombre", key: "name" },
              { label: "Apellido", key: "lastName" },
              { label: "Email", key: "email", type: "email" },
              { label: "Fecha de nacimiento", key: "birthday", type: "date" },
              { label: "Teléfono", key: "phoneNumber" },
              { label: "Fecha de contratación", key: "hireDate", type: "date" },
              { label: "Numero de seguro social", key: "isssNumber" },
            ].map((campo) => (
              <Form.Group className="mb-2" key={campo.key}>
                <Form.Label>{campo.label}</Form.Label>
                <Form.Control
                  type={campo.type || "text"}
                  value={nuevoEmpleado[campo.key]}
                  onChange={(e) =>
                    setNuevoEmpleado({
                      ...nuevoEmpleado,
                      [campo.key]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => cerrarModal()}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modoEdicion ? guardarCambiosEmpleado : crearEmpleado}
          >
            {modoEdicion ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Empleados;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ClientesCard from "../components/ClientesCard";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteActual, setClienteActual] = useState({
    name: "",
    dui: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    birthday: "",
  });

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/clients");
      if (!response.ok) throw new Error("Error al cargar clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const borrarCliente = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/clients/${id}`, {
        method: "DELETE",
      });
      fetchClientes();
    } catch (error) {
      console.error("Error al borrar cliente:", error);
    }
  };

  const actualizarCliente = (cliente) => {
    // Convertimos la fecha al formato yyyy-MM-dd para el input date
    const fechaNacimiento = cliente.birthday?.substring(0, 10) || "";
    setClienteActual({ ...cliente, birthday: fechaNacimiento });
    setModoEdicion(true);
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      const url = modoEdicion
        ? `http://localhost:4000/api/clients/${clienteActual._id}`
        : "http://localhost:4000/api/clients";
      const method = modoEdicion ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteActual),
      });

      setShowModal(false);
      setClienteActual({
        name: "",
        dui: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        birthday: "",
      });
      setModoEdicion(false);
      fetchClientes();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar titulo="Clientes" />
        <h1>Cargando...</h1>
      </>
    );
  }

  return (
    <>
      <Navbar titulo="Clientes" />
      <Container className="mt-4">
        <Row>
          {clientes.map((cliente) => (
            <Col md={4} key={cliente._id}>
              <ClientesCard
                cliente={cliente}
                borrarCliente={() => borrarCliente(cliente._id)}
                actualizarCliente={() => actualizarCliente(cliente)}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* FAB */}
      <Button
        variant="primary"
        className="rounded-circle"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          fontSize: "24px",
        }}
        onClick={() => {
          setClienteActual({
            name: "",
            dui: "",
            email: "",
            phoneNumber: "",
            password: "",
            address: "",
            birthday: "",
          });
          setModoEdicion(false);
          setShowModal(true);
        }}
      >
        +
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Cliente" : "Agregar Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={clienteActual.name}
                onChange={handleChange}
                placeholder="Ingrese nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clienteActual.email}
                onChange={handleChange}
                placeholder="Ingrese correo"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={clienteActual.phoneNumber}
                onChange={handleChange}
                placeholder="Ingrese teléfono"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={clienteActual.password}
                onChange={handleChange}
                placeholder="Ingrese contraseña"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={clienteActual.address}
                onChange={handleChange}
                placeholder="Ingrese dirección"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DUI</Form.Label>
              <Form.Control
                type="text"
                name="dui"
                value={clienteActual.dui}
                onChange={handleChange}
                placeholder="Ingrese DUI"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={clienteActual.birthday}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            {modoEdicion ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Clientes;

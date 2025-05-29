import Navbar from "../components/Navbar";
import ProductosCard from "../components/ProductosCard";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);

  const fetchProductos = async () => {
    try {
      const response = await fetch("https://api-productos-js-1.onrender.com/api/products");
      if (!response.ok) throw new Error("Error al cargar productos");
      const data = await response.json();
      setProductos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const borrarProducto = async (id) => {
    try {
      const response = await fetch(`https://api-productos-js-1.onrender.com/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      fetchProductos();
    } catch (error) {
      console.error("Error al borrar producto:", error);
    }
  };

  const crearProducto = async () => {
    try {
      const response = await fetch("https://api-productos-js-1.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) {
        throw new Error("Error al crear producto");
      }
      console.log(nuevoProducto)
      cerrarModal();
      fetchProductos();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const guardarCambiosProducto = async () => {
    try {
      const response = await fetch(
        `https://api-productos-js-1.onrender.com/api/products/${nuevoProducto._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoProducto),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar producto");
      }

      cerrarModal();
      fetchProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const actualizarProducto = (producto) => {
    setModoEdicion(true);
    setNuevoProducto(producto);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setNuevoProducto({});
    setModoEdicion(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar titulo="Productos" />
        <h1>Cargando...</h1>
      </>
    );
  }

  return (
    <>
      <Navbar titulo="Productos" />

      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4" key={producto._id}>
              <ProductosCard
                producto={producto}
                borrarProducto={() => borrarProducto(producto._id)}
                actualizarProducto={() => actualizarProducto(producto)}
              />
            </div>
          ))}
        </div>

        {/* FAB */}
        <button
          className="btn btn-warning rounded-circle"
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

      {/* Modal de Producto */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: modoEdicion ? "#ffc107" : "#0d6efd", color: "white" }}
        >
          <Modal.Title>{modoEdicion ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Nombre", key: "name" },
              { label: "Descripción", key: "description" },
              { label: "Categoría", key: "category" },
              { label: "Precio", key: "price", type: "number" },
              { label: "Stock", key: "stock", type: "number" },
            ].map((campo) => (
              <Form.Group className="mb-2" key={campo.key}>
                <Form.Label>{campo.label}</Form.Label>
                <Form.Control
                  type={campo.type || "text"}
                  value={nuevoProducto[campo.key] || ""}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      [campo.key]:
                        campo.type === "number"
                          ? parseFloat(e.target.value)
                          : e.target.value,
                    })
                  }
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modoEdicion ? guardarCambiosProducto : crearProducto}
          >
            {modoEdicion ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Productos;

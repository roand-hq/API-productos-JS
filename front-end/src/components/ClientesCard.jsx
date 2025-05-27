import React from "react";
import { Card, Button } from "react-bootstrap";

const ClientesCard = ({ cliente, borrarCliente, actualizarCliente }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>
          {cliente.name} {cliente.lastName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{cliente.email}</Card.Subtitle>
        <Card.Text>
          <strong>Teléfono:</strong> {cliente.phoneNumber} <br />
          <strong>DUI:</strong> {cliente.dui} <br />
          <strong>Fecha de nacimiento:</strong>{" "}
          {cliente.birthday ? new Date(cliente.birthday).toLocaleDateString() : "N/A"} <br />
          <strong>Verificado:</strong> {cliente.verified ? "Sí" : "No"}
        </Card.Text>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={actualizarCliente}>
            Editar
          </Button>
          <Button variant="danger" onClick={borrarCliente}>
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientesCard;

const EmpleadosCard = ({ empleado, borrarEmpleado, actualizarEmpleado }) => {
  if (!empleado) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: "24rem" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">
          {empleado.name} {empleado.lastName}
        </h5>

        {/* Verifica si la fecha es valida o existe, si no, muestra el mensaje "Fecha no guardada" */}
        <p className="card-text mb-1">
          <strong>Fecha de nacimiento:</strong>{" "}
          {empleado.birthday && !isNaN(new Date(empleado.birthday))
            ? new Date(empleado.birthday).toLocaleDateString("es-ES")
            : "Fecha no guardada"}
        </p>

        <p className="card-text mb-1">
          <strong>Email:</strong> {empleado.email}
        </p>

        {/* Lo mismo, pero crea primero una variable que toma un valor */}
        {/* Dependiendo de si se guardo como hiringDate o como hireDate */}
        {/* Y luego la formatea */}
        <p className="card-text mb-1">
          <strong>Fecha de contratación:</strong>{" "}
          {(() => {
            const fecha = empleado.hiringDate || empleado.hireDate;
            return fecha && !isNaN(new Date(fecha))
              ? new Date(fecha).toLocaleDateString("es-ES")
              : "No disponible";
          })()}
        </p>

        <p className="card-text mb-1">
          <strong>Teléfono:</strong> {empleado.phoneNumber}
        </p>

        <p className="card-text mb-3">
          <strong>Seguro Social:</strong> {empleado.Isss || empleado.isssNumber}
        </p>

        <div className="d-flex gap-2">
          <button
            className="btn btn-danger"
            style={{ width: "auto", flex: "none" }}
            onClick={borrarEmpleado}
          >
            <i className="bi bi-trash3-fill me-1"></i> Eliminar
          </button>
          <button
            className="btn btn-primary"
            style={{ width: "auto", flex: "none" }}
            onClick={actualizarEmpleado}
          >
            <i className="bi bi-pencil-fill me-1"></i> Actualizar datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpleadosCard;

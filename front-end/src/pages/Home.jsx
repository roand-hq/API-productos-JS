import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Bienvenido a la app de gestión de la Ferreteria EPA
      </h1>
      <div style={styles.links}>
        <Link to="/usuarios" style={styles.link}>
          <i className="bi bi-people-fill me-2"></i>Usuarios
        </Link>
        <Link to="/empleados" style={styles.link}>
          <i className="bi bi-person-badge-fill me-2"></i>Empleados
        </Link>
        <Link to="/productos" style={styles.link}>
          <i className="bi bi-box-seam me-2"></i>Productos
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  link: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
};

export default Home;

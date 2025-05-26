import { useNavigate } from "react-router-dom";

const Navbar = ({ titulo }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark px-3 mb-4 d-flex justify-content-between align-items-center">
      <span className="navbar-brand mb-0 h1">{titulo}</span>
      <button
        className="btn btn-outline-light d-flex align-items-center"
        onClick={() => navigate("/")}
      >
        <i className="bi bi-arrow-left me-2"></i> Regresar
      </button>
    </nav>
  );
};

export default Navbar;

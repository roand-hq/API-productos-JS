import { useNavigate } from "react-router-dom";

const Navbar = ({ titulo }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark px-3 mb-4">
      <span className="navbar-brand mb-0 h1">{titulo}</span>
      <button
        className="btn btn-outline-light"
        onClick={() => navigate("/")}
      >
        Regresar
      </button>
    </nav>
  );
};

export default Navbar;

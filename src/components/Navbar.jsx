import { Link } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "../context/ThemeContext.jsx";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Catálogo", to: "/tienda" },
  { label: "Contacto", to: "/contacto" },
  { label: "Carrito", to: "/mis-productos" },
];

export default function Navbar({ cantidadCarrito }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg sticky-top google-navbar">
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/">
          <span className="google-logo-dot">G</span>
          <span className="brand-title">
            <span className="g-blue">Google</span> <span>Tech</span> <span className="g-green">Argentina</span>
          </span>
        </Link>

        <button className={`navbar-toggler border-0 ${darkMode ? "btn-outline-light text-light" : "btn-light text-dark"}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1 mb-2 mb-lg-0">
            {navLinks.map(({ label, to }) => (
              <li className="nav-item" key={label}>
                <Link to={to} className="nav-link google-nav-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0 flex-wrap">
            <button className="theme-toggle" onClick={toggleTheme} title="Cambiar tema">
              <span>{darkMode ? "☀️" : "🌙"}</span>
              <span>{darkMode ? "Claro" : "Oscuro"}</span>
            </button>
            <Link to="/tienda" className="btn-google">Ver catálogo</Link>
            <Link to="/mis-productos" className="btn-google-outline">Carrito ({cantidadCarrito})</Link>
          </div>
        </div>
      </div>
      <div className="google-color-bar"><span /><span /><span /><span /></div>
    </nav>
  );
}

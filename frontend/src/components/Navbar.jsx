import { useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/media", label: "Media" },
  { to: "/genres", label: "Géneros" },
  { to: "/directors", label: "Directores" },
  { to: "/producers", label: "Productoras" },
  { to: "/types", label: "Tipos" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-app">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Movies IU Digital
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {LINKS.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  className="nav-link"
                  to={link.to}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu">
          {auth && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addproduct" className="nav-links">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-links">
                  Product
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="nav-buttons">
          {auth ? (
            <button onClick={handleLogout} className="nav-links">
              Logout ({JSON.parse(auth).username})
            </button>
          ) : (
            <>
              <Link to="/signup" className="nav-links">
                Signup
              </Link>
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

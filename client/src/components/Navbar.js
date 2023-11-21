import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/navbar.css"; // Make sure to create a Navbar.css file in the same directory
import homepage from "./flags/homepage.png"

const Navbar = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <span className="nav-homepage" onClick={handleClick}><img src={homepage} alt='homepage icon'/></span>
        </li>
        <li className="nav-item">
          <span className="nav-about" onClick={() => navigate("/about")}>About</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

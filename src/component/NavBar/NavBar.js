import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [showDarkNav, handleShowDarkNav] = useState(false);
  const navigate = useNavigate();

  const transitionForNav = () => {
    if (window.scrollY > 80) {
      handleShowDarkNav(true);
    } else {
      handleShowDarkNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionForNav);
    return () => {
      window.removeEventListener("scroll", transitionForNav);
    };
  }, []);

  return (
    <div className={`navbar ${showDarkNav && "navbar-dark"}`}>
      <img
        className="logo"
        onClick={() => navigate("/")}
        src="logo1.svg"
        alt="nav_logo"
      ></img>
      <img
        className="avatar"
        onClick={() => navigate("/profile")}
        src="avatar.png"
        alt="avatar"
      ></img>
    </div>
  );
}

export default NavBar;

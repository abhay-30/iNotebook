import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation;
  useEffect(() => {
    console.log(location);
  }, [location]);

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          iNotebook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>

        {!localStorage.getItem("token") ? (
          <div>
            <a className="btn btn-primary mx-1" href="/login" role="button">
              Login
            </a>
            <a className="btn btn-primary mx-1" href="/signup" role="button">
              SignUp
            </a>
          </div>
        ) : (
          <button className="btn btn-primary mx-2" onClick={handleClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

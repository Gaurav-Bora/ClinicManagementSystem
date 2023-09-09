import React from "react";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
const HomePage = () => {
  return (
    <div>
      <div className="container-fluid homebg">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
        
        <Link to='/profile'>
        <button
          type="button"
          className="badge text-bg-primary position-absolute top-20 end-0 translate-middle p-3"style={{ top: '83px' }}

        >Your Profile</button> </Link>
        <Link to='/medical-record'>
        <button
          type="button"
          className="badge text-bg-primary position-absolute p-3" style={{ top: '59px', right: '159px' }}

        >Medical Record</button> </Link>
        <div className="container text-center text-primary-emphasis position-absolute top-50 start-0 translate-middle-y p-2">
          <h1>WE CARE ABOUT YOUR HEALTH</h1>
        </div>
        <button
          type="button"
          className="badge text-bg-primary position-fixed bottom-0 start-50 translate-middle-x p-3"
        >
          Make an Appointment
        </button>
      </div>
    </div>
  );
};

export default HomePage;

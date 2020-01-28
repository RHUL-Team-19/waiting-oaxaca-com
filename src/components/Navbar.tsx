import React from 'react';
import NavOption from './NavOption';

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      />
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">Home</a>
        <NavOption option="Restaurants" />
        <NavOption option="Menu" />
        <NavOption option="Staff" />
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              <strong>Sign out</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;

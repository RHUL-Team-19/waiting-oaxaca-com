import React from 'react';

const NavOption = ({ option }: { option: string }) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <a className="navbar-link">{option}</a>
    <div className="navbar-dropdown">
      <a className="navbar-item">Find</a>
      <a className="navbar-item">View all</a>
      <hr className="navbar-divider" />
      <a className="navbar-item">Create</a>
    </div>
  </div>
);

export default NavOption;

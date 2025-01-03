import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/user">User Module</Link>
      <Link to="/admin">Admin Module</Link>
      <Link to="/reporting">Reporting Module</Link>
    </nav>
  );
};

export default Navigation;


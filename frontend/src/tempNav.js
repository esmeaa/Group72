import React from 'react'
import { NavLink } from 'react-router-dom';
import './tempNav.css'; // We'll define styles here


const tempNav = () => {
  return (
    <nav className="tempNav">
        <ul className="nav-links">
            <li><NavLink to="/launch" className="nav-link"> Launch</NavLink></li>
            <li><NavLink to="/login" className="nav-link"> LoginPage</NavLink></li>
            <li><NavLink to="/admin" className="nav-link"> Admin Dashboard</NavLink></li>
        </ul>
    </nav>

  );
}

export default tempNav;

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
            <li><NavLink to="/builderDashboard" className="nav-link"> Builder Dashboard</NavLink></li>
            <li><NavLink to="/HomeSeekerRegister" className="nav-link"> Home Seeker Register</NavLink></li>
            <li><NavLink to="/BuilderRegister" className="nav-link"> Builder Register</NavLink></li>
            <li><NavLink to="/AdminRegister" className="nav-link"> Admin Register</NavLink></li>
            <li><NavLink to="/HomeSeekerDashboard" className="nav-link"> Home Seeker Dashboard</NavLink></li>
        </ul>
    </nav>

  );
}

export default tempNav;

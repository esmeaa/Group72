import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './tempNav.module.css'; // We'll define styles here


const tempNav = () => {
  return (
    <nav className={styles.tempNav}>
        <ul className={styles.nav_links}>
            <li><NavLink to="/launch" className={styles.nav_link}> Launch</NavLink></li>
            <li><NavLink to="/login" className={styles.nav_link}> LoginPage</NavLink></li>
            <li><NavLink to="/admin" className={styles.nav_link}> Admin Dashboard</NavLink></li>
            <li><NavLink to="/builderDashboard" className={styles.nav_link}> Builder Dashboard</NavLink></li>
            <li><NavLink to="/HomeSeekerRegister" className={styles.nav_link}> Home Seeker Register</NavLink></li>
            <li><NavLink to="/BuilderRegister" className={styles.nav_link}> Builder Register</NavLink></li>
            <li><NavLink to="/AdminRegister" className={styles.nav_link}> Admin Register</NavLink></li>
        </ul>
    </nav>

  );
}

export default tempNav;

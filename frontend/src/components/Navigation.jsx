import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'; // We'll define styles here


const Navigation = () => {
  return (
    <nav className={styles.tempNav}>
        <ul className={styles.nav_links}>
            <li><NavLink to="/launch" className={styles.nav_link}>Launch</NavLink></li>
            <li><NavLink to="/login" className={styles.nav_link}>Login</NavLink></li>
            <li><NavLink to="/admin" className={styles.nav_link}>Admin Dashboard</NavLink></li>
            <li><NavLink to="/builderDashboard" className={styles.nav_link}>Builder Dashboard</NavLink></li>
            <li><NavLink to="/HomeSeekerDashboard" className={styles.nav_link}> Home Seeker Dashboard</NavLink></li>
            <li><NavLink to="/BuilderMarket" className={styles.nav_link}>Builder Market</NavLink></li>
            <li><NavLink to="/HomeMarket" className={styles.nav_link}>Home Market</NavLink></li>
            <li><NavLink to="/HomeSeekerRegister" className={styles.nav_link}>Home Seeker Register</NavLink></li>
            <li><NavLink to="/BuilderRegister" className={styles.nav_link}>Builder Register</NavLink></li>
            <li><NavLink to="/AdminRegister" className={styles.nav_link}>Admin Register</NavLink></li>
            <li><NavLink to="/Profile" className={styles.nav_link}>Profile</NavLink></li>
            <li><NavLink to="/ChatBox" className={styles.nav_link}>Chat Box</NavLink></li>
            <li><NavLink to="/ReviewApps" className={styles.nav_link}>Review Applications</NavLink></li>
        </ul>
    </nav>

  );
}

export default Navigation;

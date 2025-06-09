import React, { useState } from 'react';
import styles from './HomeSeekerDashboard.module.css';
import { Edit, Home, Bookmark, User, Settings } from 'lucide-react';
import houseImage from '../images/makers_valley_house.jpg';
import { Link } from 'react-router-dom';

const HomeSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div className={styles.hs_dashboard}>
      <div className={styles.profile_section}>
        <div className={styles.top_info}>
          <div className={styles.avatar_default}>
            <User size={30} />
          </div>
          <div className={styles.details}>
            <h2>John Doe</h2>
            <p>Home Seeker</p>
            <p>johndoe@example.com</p>
          </div>
          <button className={styles.edit_btn}>
            <Edit size={16} />
            Edit Details
          </button>
        </div>
        <div className={styles.stats}>
          <div className={`${styles.stat} ${styles.green}`}>
            <h3>2</h3>
            <p>Applications</p>
          </div>
          <div className={`${styles.stat} ${styles.pink}`}>
            <h3>3</h3>
            <p>Saved Listings</p>
          </div>
          <div className={`${styles.stat} ${styles.purple}`}>
            <h3>R5,000</h3>
            <p>Budget</p>
          </div>
        </div>
      </div>

      <div className={styles.toggle_section}>
        <button
          className={`toggle-tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My House Applications
        </button>
        <button
          className={`toggle-tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Listings
        </button>
      </div>

      <div className={styles.view_section}>
        <div className={styles.view_header}>
          <h3>{activeTab === 'applications' ? 'Applications' : 'Saved Listings'}</h3>
          <Link to="/my-applications">View All</Link>
        </div>

        <div className={styles.listing_card}>
          <img src={houseImage} alt="Makers Valley House" />
          <div className={styles.listing_info}>
            <div className={styles.listing_title}>
              <h4>1 Bedroom Unit</h4>
              <span className={styles.price}>R3,500/month</span>
            </div>
            <p>
              Located in the heart of Makers Valley, this basic one-bedroom unit features brick walls,
              functional layout, and standard ventilation. Approx. 650 sq ft.
            </p>
            <div className={styles.listing_tags}>
              <span>
                <Home size={14} /> 1 Bed
              </span>
              <span>
                <Bookmark size={14} /> 1 Bath
              </span>
              <span>
                <Settings size={14} /> 650 sq ft
              </span>
            </div>
            <div className={styles.listing_status}>
              <span className={styles.accepted}>Accepted</span>
              <button className={styles.pay_btn}>Pay</button>
              <button className={styles.contact_btn}>Contact Admin</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom_nav}>
        <Home size={24} />
        <Bookmark size={24} />
        <User size={24} />
        <Settings size={24} />
      </div>
    </div>
  );
};

export default HomeSeekerDashboard;

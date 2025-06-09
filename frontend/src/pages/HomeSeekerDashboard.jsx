import React, { useState } from 'react';
import './HomeSeekerDashboard.css';
import { Edit, Home, Bookmark, User, Settings } from 'lucide-react';
import houseImage from '../images/makers_valley_house.jpg';
import { Link } from 'react-router-dom';

const HomeSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div className="hs-dashboard">
      <div className="profile-section">
        <div className="top-info">
          <div className="avatar-default">
            <User size={30} />
          </div>
          <div className="details">
            <h2>John Doe</h2>
            <p>Home Seeker</p>
            <p>johndoe@example.com</p>
          </div>
          <button className="edit-btn">
            <Edit size={16} />
            Edit Details
          </button>
        </div>
        <div className="stats">
          <div className="stat green">
            <h3>2</h3>
            <p>Applications</p>
          </div>
          <div className="stat pink">
            <h3>3</h3>
            <p>Saved Listings</p>
          </div>
          <div className="stat purple">
            <h3>R5,000</h3>
            <p>Budget</p>
          </div>
        </div>
      </div>

      <div className="toggle-section">
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

      <div className="view-section">
        <div className="view-header">
          <h3>{activeTab === 'applications' ? 'Applications' : 'Saved Listings'}</h3>
          <Link to="/my-applications">View All</Link>
        </div>

        <div className="listing-card">
          <img src={houseImage} alt="Makers Valley House" />
          <div className="listing-info">
            <div className="listing-title">
              <h4>1 Bedroom Unit</h4>
              <span className="price">R3,500/month</span>
            </div>
            <p>
              Located in the heart of Makers Valley, this basic one-bedroom unit features brick walls,
              functional layout, and standard ventilation. Approx. 650 sq ft.
            </p>
            <div className="listing-tags">
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
            <div className="listing-status">
              <span className="accepted">Accepted</span>
              <button className="pay-btn">Pay</button>
              <button className="contact-btn">Contact Admin</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-nav">
        <Home size={24} />
        <Bookmark size={24} />
        <User size={24} />
        <Settings size={24} />
      </div>
    </div>
  );
};

export default HomeSeekerDashboard;

import React, { useState } from 'react';
import styles from './adminDashboard.module.css';
import { Home, User, Settings, Edit, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

// JobForm and HousingForm remain unchanged from your version
function JobForm({ onSubmit }) { /* ... */ }
function HousingForm({ onSubmit }) { /* ... */ }

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [houses, setHouses] = useState([]);
  const [activeView, setActiveView] = useState('postProject');
  const [projectTab, setProjectTab] = useState('job');
  const user = { name: 'John Doe', role: 'Admin', email: 'johndoe@doe.com' };

  const handleJobSubmit = job => setJobs(prev => [...prev, { id: Date.now(), ...job }]);
  const handleHouseSubmit = h => setHouses(prev => [...prev, { id: Date.now(), ...h }]);

  return (
    <div className={styles.admin_dash}>
      <div className={styles.admin_inner}>
        {/* Profile & Stats */}
        <div className={styles.profile_section}>
          <div className={styles.top_info}>
            <div className={styles.avatar_default}><User size={30} /></div>
            <div className={styles.profile_text_block}>
              <div className={styles.details}>
                <h2>{user.name}</h2>
                <p>{user.role}</p>
                <p>{user.email}</p>
              </div>
              {/* <-- Linked button */}
              <Link to="/profile">
                <button className={styles.edit_btn}>
                  <Edit size={16} /> Edit Details
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={`${styles.stat} ${styles.green}`}>
              <h3>{jobs.length}</h3><p>Jobs Posted</p>
            </div>
            <div className={`${styles.stat} ${styles.pink}`}>
              <h3>{houses.length}</h3><p>Housing Posted</p>
            </div>
            <div className={`${styles.stat} ${styles.purple}`}>
              <h3>{jobs.length + houses.length}</h3><p>Total Listings</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.toggle_section}>
          <button
            className={`${styles.toggle_tab} ${activeView === 'manage' ? styles.active : ''}`}
            onClick={() => setActiveView('manage')}
          >
            Manage Apps
          </button>
          <button
            className={`${styles.toggle_tab} ${activeView === 'postProject' ? styles.active : ''}`}
            onClick={() => setActiveView('postProject')}
          >
            Post Project
          </button>
        </div>

        {/* Content */}
        <div className={styles.application_holder}>
          {activeView === 'postProject' ? (
            <>
              <div className={styles.tabBar}>
                <button
                  className={`${styles.tab} ${projectTab === 'job' ? styles.activeTab : ''}`}
                  onClick={() => setProjectTab('job')}
                >
                  <Hammer size={16} /> Post Job
                </button>
                <button
                  className={`${styles.tab} ${projectTab === 'housing' ? styles.activeTab : ''}`}
                  onClick={() => setProjectTab('housing')}
                >
                  <Home size={16} /> List Housing
                </button>
              </div>
              {projectTab === 'job'
                ? <JobForm onSubmit={handleJobSubmit} />
                : <HousingForm onSubmit={handleHouseSubmit} />
              }
            </>
          ) : (
            <div className={styles.mock_view}>Manage Applications Coming Soon</div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className={styles.bottom_nav}>
        <Home size={24} onClick={() => setActiveView('postProject')} />
        <Hammer size={24} onClick={() => setActiveView('postProject')} />
        <User size={24} onClick={() => setActiveView('manage')} />
        <Settings size={24} onClick={() => {}} />
      </div>
    </div>
  );
};

export default AdminDashboard;


import {React, useState} from 'react';
import styles from './adminDashboard.module.css';
import { Hammer, Home, Check, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate;
    const [activeMainView, setActiveMainView] = useState('postProject'); 
    const [projectTab, setProjectTab] = useState('job'); // 'job' or 'housing'
    const [applicationTab, setApplicationTab] = useState('job'); // 'job' or 'housing'
   
    const [showAll, setShowAll] = useState(false);
  
    const user = {
      name: "John Doe",
      type: "Admin",
      email: "johndoe@doe.com",
      phone: "+27-0000-000000",
    }
  
   
  
  
   
    // Placeholder Components
function JobForm() {
  return <div>Post a Job Form</div>;
}

function HousingForm() {
  return <div>List Housing Form</div>;
}

function JobApplications() {
  return <div>Job Applications View</div>;
}

function HousingApplications() {
  return <div>Housing Applications View</div>;
}
    
    return (
      <div className={styles.admin_dash}>
        <div className={styles.admin_inner}>
          <article className={`${styles.holder} ${styles.profile}`}>
            <button>Edit Details</button>
            <div className={styles.icon}>
              
            </div>
            <span className={styles.welcome}>
              <span>Welcome back, {user.name}!</span>
              <p>{user.type}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </span>
          </article>
  

          <div className={styles.adminButtons}>
          <button onClick={() => setActiveMainView('manageApplications')}>Manage All Applications</button>
          <button onClick={() => setActiveMainView('postProject')}>Post a Project</button>
            
          </div>
  
          <div className={`${styles.application_holder} ${styles.holder}`}>
          {activeMainView === 'postProject' && (
          <>
            <div className={styles.tabBar}>
              <button
                className={`${styles.tab} ${projectTab === 'job' ? styles.activeTab : ''}`}
                onClick={() => setProjectTab('job')}
              >
                <Hammer size={16} />
                Post Job
              </button>
              <button
                className={`${styles.tab} ${projectTab === 'housing' ? styles.activeTab : ''}`}
                onClick={() => setProjectTab('housing')}
              >
                 <Home size={16} />
                List Housing
              </button>
            </div>
            {projectTab === 'job' ? <JobForm /> : <HousingForm />}
          </>
        )}

        {activeMainView === 'manageApplications' && (
          <>
            <div className={styles.tabBar}>
              <button
                className={`${styles.tab} ${applicationTab === 'job' ? styles.activeTab : ''}`}
                onClick={() => setApplicationTab('job')}
              >
                <Hammer size={16} />
                Job Applications
              </button>
              <button
                className={`${styles.tab} ${applicationTab === 'housing' ? styles.activeTab : ''}`}
                onClick={() => setApplicationTab('housing')}
              >
                 <Home size={16} />
                Housing Applications
              </button>
            </div>
            {applicationTab === 'job' ? <JobApplications /> : <HousingApplications />}
          </>
        )}
          </div>
          </div>
      </div>
  )
}

export default AdminDashboard;

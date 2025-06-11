// import React, { useState } from 'react';
// import styles from './HomeSeekerDashboard.module.css';
// import {
//   Edit, Home, Bookmark, User, Settings
// } from 'lucide-react';
// import houseImage from '../images/makers_valley_house.jpg';
// import { Link, useNavigate } from 'react-router-dom';

// const HomeSeekerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('applications');
//   const navigate = useNavigate();

//   return (
//     <div className={styles.hs_dashboard}>
//       {/* Profile */}
//       <div className={styles.profile_section}>
//         <div className={styles.top_info}>
//           <div className={styles.avatar_default}>
//             <User size={30} />
//           </div>
//           <div className={styles.details}>
//             <h2>John Doe</h2>
//             <p>Home Seeker</p>
//             <p>johndoe@example.com</p>
//           </div>
//           <button
//             className={styles.edit_btn}
//             onClick={() => navigate('/Profile')}
//           >
//             <Edit size={16} /> Edit Details
//           </button>
//         </div>

//         {/* Stats */}
//         <div className={styles.stats}>
//           <div className={`${styles.stat} ${styles.green}`}>
//             <h3>2</h3>
//             <p>Applications</p>
//           </div>
//           <div className={`${styles.stat} ${styles.pink}`}>
//             <h3>3</h3>
//             <p>Saved Listings</p>
//           </div>
//           <div className={`${styles.stat} ${styles.purple}`}>
//             <h3>R5,000</h3>
//             <p>Budget</p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className={styles.toggle_section}>
//         <button
//           className={`${styles.toggle_tab} ${activeTab === 'applications' ? styles.active : ''}`}
//           onClick={() => setActiveTab('applications')}
//         >
//           My House Applications
//         </button>
//         <button
//           className={`${styles.toggle_tab} ${activeTab === 'saved' ? styles.active : ''}`}
//           onClick={() => setActiveTab('saved')}
//         >
//           Saved Listings
//         </button>
//       </div>

//       {/* View Area */}
//       <div className={styles.view_section}>
//         <div className={styles.view_header}>
//           <h3>{activeTab === 'applications' ? 'Applications' : 'Saved Listings'}</h3>
//           <Link to="/my-applications">View All</Link>
//         </div>

//         <div className={styles.listing_card}>
//           <img src={houseImage} alt="Makers Valley House" />
//           <div className={styles.listing_info}>
//             <div className={styles.listing_title}>
//               <h4>1 Bedroom Unit</h4>
//               <span className={styles.price}>R3,500/month</span>
//             </div>
//             <p>
//               Located in the heart of Makers Valley, this basic one-bedroom unit features brick walls,
//               functional layout, and standard ventilation. Approx. 650 sq ft.
//             </p>
//             <div className={styles.listing_tags}>
//               <span><Home size={14} /> 1 Bed</span>
//               <span><Bookmark size={14} /> 1 Bath</span>
//               <span><Settings size={14} /> 650 sq ft</span>
//             </div>
//             <div className={styles.listing_status}>
//               <span className={styles.accepted}>Accepted</span>
//               <button className={styles.pay_btn}>Pay</button>
//               <button className={styles.contact_btn}>Contact Admin</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Responsive Bottom Navigation */}
//       <div className={styles.bottom_nav}>
//         <Home size={24} onClick={() => navigate('/seeker')} />
//         <Bookmark size={24} onClick={() => navigate('/seeker/saved')} />
//         <User size={24} onClick={() => navigate('/profile')} />
//         <Settings size={24} onClick={() => navigate('/settings')} />
//       </div>
//     </div>
//   );
// };

// export default HomeSeekerDashboard;



import React, { useEffect, useState } from 'react';
import styles from './HomeSeekerDashboard.module.css';
import {
  Heart, Clipboard, DollarSign, Edit, User, Bookmark, Settings, Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeSeekerDashboard = () => {
  const navigate = useNavigate();

  // Dynamic state
  const [savedCount, setSavedCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [budget, setBudget] = useState('R0');

  const userId = 1; // Replace with real user ID logic

  useEffect(() => {
    // 🔌 API Placeholder: Get saved listings count
    fetch(`/api/homeSeeker/${userId}/saved-listings`)
      .then(res => res.json())
      .then(data => setSavedCount(data.count || 0))
      .catch(err => console.error("Saved Listings Error:", err));

    // 🔌 API Placeholder: Get applications count
    fetch(`/api/homeSeeker/${userId}/applications`)
      .then(res => res.json())
      .then(data => setApplicationsCount(data.count || 0))
      .catch(err => console.error("Applications Error:", err));

    // 🔌 API Placeholder: Get budget info
    fetch(`/api/homeSeeker/${userId}/budget`)
      .then(res => res.json())
      .then(data => setBudget(data.budget ? `R${data.budget}` : 'R0'))
      .catch(err => console.error("Budget Error:", err));
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.profileRow}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}><User size={30} /></div>
          <div>
            <h2>Hi John Doe!</h2>
            <p className={styles.subtitle}>Home Seeker • john.doe@email.com</p>
          </div>
        </div>

        <button className={styles.editBtn} onClick={() => navigate('/Profile')}>
          <Edit size={16} /> Edit Details
        </button>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard + ' ' + styles.green}>
          <Heart size={20} />
          <div className={styles.statText}>
            <span className={styles.statNumber}>{String(savedCount).padStart(2, '0')}</span>
            <span>Saved Listings</span>
          </div>
        </div>
        <div className={styles.statCard + ' ' + styles.pink}>
          <Clipboard size={20} />
          <div className={styles.statText}>
            <span className={styles.statNumber}>{String(applicationsCount).padStart(2, '0')}</span>
            <span>Applications</span>
          </div>
        </div>
        <div className={styles.statCard + ' ' + styles.purple}>
          <DollarSign size={20} />
          <div className={styles.statText}>
            <span className={styles.statNumber}>{budget}</span>
            <span>Budget Range</span>
          </div>
        </div>
      </div>

      {/* Listings would appear here */}
      <div className={styles.listings}></div>

      <div className={styles.bottomNav}>
        <Home size={24} onClick={() => navigate('/seeker')} />
        <Bookmark size={24} onClick={() => navigate('/seeker/saved')} />
        <User size={24} onClick={() => navigate('/profile')} />
        <Settings size={24} onClick={() => navigate('/settings')} />
      </div>
    </div>
  );
};

export default HomeSeekerDashboard;
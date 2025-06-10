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
  Edit,
  Home as HomeIcon,
  Bookmark,
  User,
  Settings,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import houseImage from '../images/makers_valley_house.jpg';

const HomeSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [budget, setBudget] = useState(5000); // or fetch from user profile
  const navigate = useNavigate();

  const userId = 1; // 👈 Replace with logged-in user's ID

  // Fetch saved listings & applications on load
  useEffect(() => {
    // Placeholder: Replace with real API endpoints
    fetch(`/api/seeker/${userId}/applications`)
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error('Error fetching applications:', err));

    fetch(`/api/seeker/${userId}/saved`)
      .then(res => res.json())
      .then(data => setSavedListings(data))
      .catch(err => console.error('Error fetching saved:', err));
  }, [userId]);

  const handleApply = async listing => {
    try {
      const res = await fetch(`/api/seeker/${userId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing.id }),
      });
      const result = await res.json();

      if (res.ok) {
        setApplications(prev => [...prev, { ...listing, status: 'pending' }]);
        setSavedListings(prev =>
          prev.filter(item => item.id !== listing.id)
        );
        setActiveTab('applications');
      } else {
        console.error('Apply error:', result);
      }
    } catch (err) {
      console.error('Application failed:', err);
    }
  };

  return (
    <div className={styles.hs_dashboard}>
      {/* Profile */}
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
          <button
            className={styles.edit_btn}
            onClick={() => navigate('/profile')}
          >
            <Edit size={16} /> Edit Details
          </button>
        </div>

        <div className={styles.stats}>
          <div className={`${styles.stat} ${styles.green}`}>
            <h3>{applications.length}</h3>
            <p>Applications</p>
          </div>
          <div className={`${styles.stat} ${styles.pink}`}>
            <h3>{savedListings.length}</h3>
            <p>Saved Listings</p>
          </div>
          <div className={`${styles.stat} ${styles.purple}`}>
            <h3>R{budget.toLocaleString()}</h3>
            <p>Budget</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.toggle_section}>
        <button
          className={`${styles.toggle_tab} ${
            activeTab === 'applications' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('applications')}
        >
          My House Applications
        </button>
        <button
          className={`${styles.toggle_tab} ${
            activeTab === 'saved' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Listings
        </button>
      </div>

      {/* View Section */}
      <div className={styles.view_section}>
        <div className={styles.view_header}>
          <h3>
            {activeTab === 'applications' ? 'Applications' : 'Saved Listings'}
          </h3>
        </div>

        {(activeTab === 'applications' ? applications : savedListings).map(
          listing => (
            <div key={listing.id} className={styles.listing_card}>
              <img src={houseImage} alt={listing.title} />
              <div className={styles.listing_info}>
                <div className={styles.listing_title}>
                  <h4>{listing.title}</h4>
                  <span className={styles.price}>
                    R{listing.price}/month
                  </span>
                </div>
                <p>{listing.description}</p>
                <div className={styles.listing_tags}>
                  <span>
                    <HomeIcon size={14} /> {listing.beds} Bed
                  </span>
                  <span>
                    <Bookmark size={14} /> {listing.baths} Bath
                  </span>
                  <span>
                    <Settings size={14} /> {listing.size} sq ft
                  </span>
                </div>
                <div className={styles.listing_status}>
                  {activeTab === 'saved' ? (
                    <button
                      className={styles.apply_btn}
                      onClick={() => handleApply(listing)}
                    >
                      Apply Now
                    </button>
                  ) : listing.status === 'accepted' ? (
                    <>
                      <span className={styles.accepted}>Accepted</span>
                      <button className={styles.pay_btn}>Pay</button>
                      <button className={styles.contact_btn}>
                        Contact Admin
                      </button>
                    </>
                  ) : (
                    <span className={styles.accepted}>Pending</span>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Bottom Nav */}
      <div className={styles.bottom_nav}>
        <HomeIcon size={24} onClick={() => navigate('/launch')} />
        <Bookmark size={24} onClick={() => navigate('/seeker/saved')} />
        <User size={24} onClick={() => navigate('/Profile')} />
        <Settings size={24} onClick={() => navigate('/settings')} />
      </div>
    </div>
  );
};

export default HomeSeekerDashboard;
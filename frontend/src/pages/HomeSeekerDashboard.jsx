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
  Heart,
  Clipboard,
  DollarSign,
  User,
  Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import houseImage from '../images/makers_valley_house.jpg';

const HomeSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [budget, setBudget] = useState(5000); // placeholder for backend
  const navigate = useNavigate();
  const userId = 1; // placeholder for backend

  const username = localStorage.getItem("username") || "Guest";
  const firstName = localStorage.getItem("firstName") || "Guest";
  const lastName = localStorage.getItem("lastName") || "Guest";

  useEffect(() => {
    fetch(`/api/seeker/${userId}/applications`)
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(console.error);
    fetch(`/api/seeker/${userId}/saved`)
      .then(res => res.json())
      .then(data => setSavedListings(data))
      .catch(console.error);
  }, [userId]);

  const handleApply = async listing => {
    const res = await fetch(`/api/seeker/${userId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: listing.id }),
    });
    if (res.ok) {
      setApplications(prev => [...prev, { ...listing, status: 'pending' }]);
      setSavedListings(prev => prev.filter(item => item.id !== listing.id));
      setActiveTab('applications');
    }
  };

  return (
    <div className={styles.hs_dashboard}>
      {/* Profile Stats */}
      <div className={styles.profile_section}>
        <div className={styles.top_info}>
          <div className={styles.avatar_default}><User size={30} /></div>
          <div className={styles.details}>
            <h2>{firstName}{lastName}</h2>
            <p>Home Seeker</p>
            <p>{username}</p>
          </div>
          <button className={styles.edit_btn} onClick={() => navigate('/profile')}>
            <Edit size={16} /> Edit Details
          </button>
        </div>

       
      </div>
       {/* Home Seeker Application Stats */}
       <div className={styles.stats}>
          <div className={`${styles.stat} ${styles.green}`}>
            <Heart size={24} />
            <span className={styles.statText}>
              <span className={styles.statLabel}>Saved Listings</span>
              <span className={styles.statNumber}>{savedListings.length.toString().padStart(2, '0')}</span>
            </span>
          </div>
          <div className={`${styles.stat} ${styles.pink}`}>
            <Clipboard size={24} />
            <span className={styles.statText}>
              <span className={styles.statLabel}>Applications</span>
              <span className={styles.statNumber}>{applications.length.toString().padStart(2, '0')}</span>
            </span>
          </div>
          <div className={`${styles.stat} ${styles.purple}`}>
            <DollarSign size={24} />
            <span className={styles.statText}>
              <span className={styles.statLabel}>Budget</span>
              <span className={styles.statNumber}>{`R ${budget.toLocaleString()}`}</span>
            </span>
          </div>
        </div>

      {/* Toggle Tabs Between 'My House Applications' and 'Saved Listings' */}
      <div className={styles.toggle_section}>
        <button
          className={`${styles.toggle_tab} ${activeTab === 'applications' ? styles.active : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My House Applications
        </button>
        <button
          className={`${styles.toggle_tab} ${activeTab === 'saved' ? styles.active : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Listings
        </button>
      </div>


      {/* House Listings */}
      <div className={styles.view_section}>
        <div className={styles.view_header}>
          <h3>{activeTab === 'applications' ? 'Applications' : 'Saved Listings'}</h3>
        </div>

        {(activeTab === 'applications' ? applications : savedListings).map(listing => (
          <div key={listing.id} className={styles.listing_card}>
            <img src={houseImage} alt={listing.title} />
            <div className={styles.listing_info}>
              <div className={styles.listing_title}>
                <h4>{listing.title}</h4>
                <span className={styles.price}>R{listing.price}/mo</span>
              </div>
              <p>{listing.description}</p>
              <div className={styles.listing_tags}>
                <span><HomeIcon size={14} /> {listing.beds} Bed</span>
                <span><Bookmark size={14} /> {listing.baths} Bath</span>
                <span><Settings size={14} /> {listing.size} sq ft</span>
              </div>
              <div className={styles.listing_status}>
                {activeTab === 'saved' ? (
                  <button className={styles.apply_btn} onClick={() => handleApply(listing)}>
                    Apply Now
                  </button>
                ) : listing.status === 'accepted' ? (
                  <>
                    <span className={styles.accepted}>Accepted</span>
                    <button className={styles.pay_btn}>Pay</button>
                    <button className={styles.contact_btn}>Contact Admin</button>
                  </>
                ) : (
                  <span className={styles.accepted}>Pending</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className={styles.bottom_nav}>
        <HomeIcon size={24} onClick={() => navigate('/launch')} />
        <Bookmark size={24} onClick={() => setActiveTab('saved')} />
        <User size={24} onClick={() => navigate('/profile')} />
        <Settings size={24} onClick={() => navigate('/settings')} />
      </div>
    </div>
  );
};

export default HomeSeekerDashboard;

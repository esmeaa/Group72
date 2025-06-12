
import React, { useEffect, useState } from 'react';
import styles from './HomeSeekerDashboard.module.css';
import { Edit, Home as HomeIcon, Bookmark, User, Settings, Heart, Clipboard, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Makers Valley Housing Images
import house_image_1 from '../images/makers_valley_house.jpg';
import house_image_2 from '../images/makers_valley_house2.jpg';

// Sample House Data for Saved and Application Listings
const sample_saved_listings = [
  {
    id: 1,
    title: '2BR Townhouse',
    price: 2500,
    beds: 2,
    baths: 1,
    size: 900,
    description: 'Comfortable and centrally located.',
    image: house_image_1,
  },
  {
    id: 2,
    title: '34 Village Way',
    price: 1800,
    beds: 1,
    baths: 1,
    size: 400,
    description: 'Great for singles or couples.',
    image: house_image_2,
  },
];

const sample_application_listings = [
  {
    id: 3,
    title: 'Renovated Loft',
    price: 3200,
    beds: 1,
    baths: 1,
    size: 650,
    description: 'Sunny loft in the city centre.',
    image: house_image_1,
    status: 'pending',
  },
  {
    id: 4,
    title: '35 Hut Road',
    price: 4500,
    beds: 3,
    baths: 2,
    size: 1600,
    description: 'Spacious home with garden.',
    image: house_image_2,
    status: 'accepted',
  },
];

// Local storage keys
const storage_key_saved = 'seeker_saved';
const storage_key_apps = 'seeker_apps';

const HomeSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [budget] = useState(5000); // placeholder for budget amount
  const navigate = useNavigate();

  // Initialising local storage samples
  useEffect(() => {
    const rawSaved = localStorage.getItem(storage_key_saved);
    const rawApps = localStorage.getItem(storage_key_apps);

    try {
      if (rawSaved && rawSaved !== 'undefined') {
        setSavedListings(JSON.parse(rawSaved));
      } else {
        localStorage.setItem(storage_key_saved, JSON.stringify(sample_saved_listings));
        setSavedListings(sample_saved_listings);
      }

      if (rawApps && rawApps !== 'undefined') {
        setApplications(JSON.parse(rawApps));
      } else {
        localStorage.setItem(storage_key_apps, JSON.stringify(sample_application_listings));
        setApplications(sample_application_listings);
      }
    } catch (err) {
      console.error("Failed to parse localStorage data", err);
      localStorage.setItem(storage_key_saved, JSON.stringify(sample_saved_listings));
      setSavedListings(sample_saved_listings);
      localStorage.setItem(storage_key_apps, JSON.stringify(sample_application_listings));
      setApplications(sample_application_listings);
    }
  }, []);

  const updateStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 'Apply Now' function that moves from 'Saved Listings' to 'Applications' when clicked
  const handleApply = (listing) => {
    const moved = { ...listing, status: 'pending' };
    const newSaved = savedListings.filter(item => item.id !== listing.id);
    const newApps = [moved, ...applications];

    setSavedListings(newSaved);
    setApplications(newApps);
    updateStorage(storage_key_saved, newSaved);
    updateStorage(storage_key_apps, newApps);
    setActiveTab('applications');
  };

  return (
    <div className={styles.hs_dashboard}>
      {/* Profile Stats */}
      <div className={styles.profile_section}>
        <div className={styles.top_info}>
          <div className={styles.avatar_default}><User size={30} /></div>
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
      </div>

      {/* Home Seeker Application Stats */}
      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.green}`}>
          <Heart size={24} />
          <span className={styles.statText}>
            <span className={styles.statLabel}>Saved Listings</span>
            <span className={styles.statNumber}>
              {savedListings.length.toString().padStart(2, '0')}
            </span>
          </span>
        </div>
        <div className={`${styles.stat} ${styles.pink}`}>
          <Clipboard size={24} />
          <span className={styles.statText}>
            <span className={styles.statLabel}>Applications</span>
            <span className={styles.statNumber}>
              {applications.length.toString().padStart(2, '0')}
            </span>
          </span>
        </div>
        <div className={`${styles.stat} ${styles.purple}`}>
          <DollarSign size={24} />
          <span className={styles.statText}>
            <span className={styles.statLabel}>Budget</span>
            <span className={styles.statNumber}>
              R {budget.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      {/* Toggle Tabs */}
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
          <h3>
            {activeTab === 'applications' ? 'Applications' : 'Saved Listings'}
          </h3>
        </div>
        {(activeTab === 'applications' ? applications : savedListings).map(listing => (
          <div
            key={listing.id}
            className={styles.listing_card}
          >
            <img src={listing.image} alt={listing.title} />
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

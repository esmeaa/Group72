// import { React, useState } from 'react'
// import styles from "./HomeMarket.module.css";

// // Create an Action bar to use for all pages

// function HomeMarket() {
//   // A 'false' form that is never submitted but the values are used for filtering
//   const [formData, setFormData] = useState({
//     search: "",
//     location: "",
//     cost: 0,
//     beds: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const listing1 = {
//     title: "Modern Apartment",
//     desc: "Newly renovated",
//     location: "Downtown",
//     beds: 2,
//     baths: 1,
//     area: 720,
//     cost: 18700,
//     tags: [
//       "Air Conditioning",
//     ],
//   }

//   const listFilter = (listing) => {
//     const formSearch = formData.search
//     if(formSearch) {
//       var used = listing.title.toLowerCase();
//       if(!used.includes(formSearch.toLowerCase())) {
//         return false;
//       }
//     }
//     const formLocation = formData.location
//     if(formLocation) {
//       if(formLocation.toLowerCase() !== listing?.location.toLowerCase()) {
//         return false;
//       }
//     }
//     const formBeds = formData.beds
//     if(formBeds && (listing.beds !== formBeds)) {
//       return false;
//     }
//     const formCost = formData.cost;
//     if(formCost && (formCost < listing.cost)) {
//       return false;
//     }
//     return true;
//   }

//   // const getListings = async () => {
//   //   const response = await (fetch("http://localhost:3001/api/homelistings"));
//   //   const data = await response.json();
//   //   return data.listings.filter(listFilter);
//   // }

//   const getListings = () => {
//     var listings = [listing1];
//     return listings.filter(listFilter);
//   }

//   const getListingsContent = async () => {
//     //const listings = await getListings();
//     const listings = getListings();
//     if(!listings.length) {
//       return (
//         <div>
//           <p>No listings</p>
//         </div>
//       )
//     }
//     return (
//       <div>
//         <p>{listings.length} Properties Available</p>
//         {listings.map((listing) => {
//           return (
//             <div className={`${styles.holder} ${styles.listing}`}>
//               <div className={styles.listing_item}>
//                 <h2>{listing.title}</h2>
//                 <div>
//                   <p>R: {listing.cost}/ Month</p>
//                 </div>
//                 <div className={styles.text}>
//                   <p className={styles.subtle}>{listing.location}</p>
//                   <p>{listing.desc}</p>
//                 </div>
//                 <ul>
//                   <p>{listing.beds} bed</p>
//                   <p>{listing.bath} baths</p>
//                   <p>{listing.area} Sq ft</p>
//                 </ul>
//               </div>
//               {listing.tags.map((tag) => {
//                 return (
//                   <div>
//                     <p>{tag}</p>
//                   </div>
//                 )
//               })}
//               <div className={`${styles.button} ${styles.listing_item}`}>
//                 <button>Contact</button>
//                 <button>Apply</button>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     )
//   }

//   return (
//     <div className={styles.builder_dash}>
//       <div className={styles.builder_inner}>
//         <div className={styles.holder}>
//           <h1>Housing Listings</h1>
//           <p>Find quality, affordable housing in makers valley</p>
//         </div>
//         <div className={`${styles.holder} ${styles.search}`}>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <p>Search and Filter Housing</p>
//                 <input 
//                   type="text"
//                   name="search"
//                   value={formData.search}
//                   onChange={handleChange}
//                 />
//               <button>Clear Filters</button>
//             </div>
//             <div>
//               <span>
//                 <p>Location</p>
//                 <input 
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                 />
//               </span>
//               <span>
//                 <p>Max Price</p>
//                 <input 
//                   type="text"
//                   name="cost"
//                   value={formData.cost}
//                   onChange={handleChange}
//                 />
//               </span>
//               <span>
//                 <p>Bedrooms</p>
//                 <input 
//                   type="text"
//                   name="beds"
//                   value={formData.beds}
//                   onChange={handleChange}
//                 />
//               </span>
//             </div>
//           </form>
//         </div>
//         <div classname={styles.listings_holder}>
//           {getListingsContent()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HomeMarket;
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMarket.module.css';
import sampleHouseImg from '../images/makers_valley_house.jpg';
import { Home, Bookmark, Settings, Heart, User, MessageCircle } from 'lucide-react';

const allHouses = [
  {
    id: 1,
    title: "Modern 1BR Apartment",
    location: "Makers Valley",
    description: "Great natural light, amenities, and rental history.",
    price: 12000,
    beds: 1,
    baths: 1,
    size: 650,
    image: sampleHouseImg,
  },
  {
    id: 2,
    title: "Spacious 2BR Home",
    location: "West Valley",
    description: "Close to shopping centers and schools.",
    price: 14000,
    beds: 2,
    baths: 2,
    size: 900,
    image: sampleHouseImg,
  },
  {
    id: 3,
    title: "Budget-Friendly Room",
    location: "South Valley",
    description: "Shared kitchen & bathroom. Affordable living.",
    price: 3000,
    beds: 1,
    baths: 1,
    size: 300,
    image: sampleHouseImg,
  },
  {
    id: 4,
    title: "Luxury 3BR House",
    location: "North Valley",
    description: "Spacious house with private yard and garage.",
    price: 18500,
    beds: 3,
    baths: 2,
    size: 1200,
    image: sampleHouseImg,
  },
  {
    id: 5,
    title: "1BR Urban Flat",
    location: "Makers Valley",
    description: "Located in the heart of the city. Safe & secure.",
    price: 9500,
    beds: 1,
    baths: 1,
    size: 540,
    image: sampleHouseImg,
  }
];

const HouseListing = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterBeds, setFilterBeds] = useState('');

  const filtered = useMemo(() => {
    return allHouses.filter(h => {
      if (search && !h.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterLocation && h.location !== filterLocation) return false;
      if (filterPrice && h.price > parseInt(filterPrice)) return false;
      if (filterBeds && (filterBeds === '3' ? h.beds < 3 : h.beds !== parseInt(filterBeds))) return false;
      return true;
    });
  }, [search, filterLocation, filterPrice, filterBeds]);

  const uniqueLocations = [...new Set(allHouses.map(h => h.location).filter(Boolean))];

  return (
    <div className={styles.page}>
      <h2>Housing Listings</h2>
      <p className={styles.subtitle}>Find quality, affordable housing in Makers Valley</p>

      <div className={styles.filters}>
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
          <option value="">Location</option>
          {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select value={filterPrice} onChange={e => setFilterPrice(e.target.value)}>
          <option value="">Price</option>
          <option value="5000">≤ R 5 000</option>
          <option value="10000">≤ R 10 000</option>
          <option value="15000">≤ R 15 000</option>
        </select>
        <select value={filterBeds} onChange={e => setFilterBeds(e.target.value)}>
          <option value="">Beds</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
          <option value="3">3+ Beds</option>
        </select>
        <button onClick={() => {
          setSearch('');
          setFilterLocation('');
          setFilterPrice('');
          setFilterBeds('');
        }}>Clear</button>
      </div>

      <p className={styles.count}>{filtered.length} Properties Available</p>

      <div className={styles.list}>
        {filtered.map(h => (
          <div key={h.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={h.image} alt={h.title} />
              <div className={styles.priceTag}>R {h.price.toLocaleString()}</div>
              <div className={styles.heart}><Heart size={20} /></div>
            </div>
            <div className={styles.details}>
              <h3>{h.title}</h3>
              <p className={styles.location}>{h.location}</p>
              <p className={styles.description}>{h.description}</p>
              <div className={styles.tags}>
                <span><Home size={14} /> {h.beds} Bed</span>
                <span><Bookmark size={14} /> {h.baths} Bath</span>
                <span><Settings size={14} /> {h.size} sq ft</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.contact}>Contact</button>
                <button className={styles.apply}>Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Bottom Navigation */}
      <div className={styles.bottom_nav}>
        <Home size={24} onClick={() => navigate('/home')} />
        <User size={24} onClick={() => navigate('/profile')} />
        <MessageCircle size={24} onClick={() => navigate('/messages')} />
        <Settings size={24} onClick={() => navigate('/settings')} />
      </div>
    </div>
  );
};

export default HouseListing;

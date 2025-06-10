// import { React, useState } from 'react'
// import styles from "./BuilderMarket.module.css";
// // Create an Action bar to use for all pages

// function BuilderMarket() {
//   // A 'false' form that is never submitted but the values are used for filtering
//   const [formData, setFormData] = useState({
//     search: "",
//     location: "",
//     tag: "",
//     pay: "",
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
//     title: "Residential Renovation",
//     provider: "Valley Construction",
//     desc: "Complete renovation",
//     location: "Downtown",
//     time: 3,
//     unit_time: "weeks",
//     pay_low: 15000,
//     pay_high: 21000,
//     tags: [
//       "Construction",
//       "Renovation",
//     ],
//   }

//   const listing2 = {
//     title: "Residential Renovation",
//     provider: "Valley Construction",
//     desc: "Complete renovation",
//     location: "Downtown",
//     time: 3,
//     unit_time: "weeks",
//     pay_low: 15000,
//     pay_high: 21000,
//     tags: [
//       "Construction",
//       "Renovation",
//     ],
//   }

//   const listFilter = (listing) => {
//     if(formData.search) {
//       var used = listing?.title.toLowerCase();
//       if(!used.includes(formData.search.toLowerCase())) {
//         return false;
//       }
//     }
//     if(formData.location) {
//       if(formData.location.toLowerCase() !== listing?.location.toLowerCase()) {
//         return false;
//       }
//     }
//     if(formData.tag) {
//       var search_tag = formData.tag.replace(/^./, char => char.toUpperCase());
//       if(!listing?.tags.includes(search_tag)) {
//         return false;
//       }
//     }
//     const formPay = formData.pay;
//     if(formPay) {
//       if(listing?.pay_low > formPay || formPay > listing?.pay_high) {
//         return false;
//       }
//     }
//     return true;
//   }

//   // const getListings = async () => {
//   //   const response = await (fetch("http://localhost:3001/api/joblistings"));
//   //   const data = await response.json();
//   //   return data.listings.filter(listFilter);
//   // }

//   const getListings = () => {
//     var listings = [listing1, listing2];
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
//         <p>{listings.length} Jobs Available</p>
//         {listings.map((listing) => {
//           return (
//             <div className={`${styles.holder} ${styles.listing}`}>
//               <div className={styles.listing_item}>
//                 <h2>{listing.title}</h2>
//                 <div className={styles.text}>
//                   <p className={styles.subtle}>{listing.provider}</p>
//                   <p>{listing.desc}</p>
//                   <p>{listing.type}</p>
//                 </div>
//                 <ul>
//                   <p>{listing.location}</p>
//                   <p>{listing.time} {listing.unit_time}</p>
//                   <p>{listing.pay_low}-{listing.pay_high}</p>
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
//                 <button>Apply Now</button>
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
//           <h1>Job Listings</h1>
//           <p>Find construction and community development jobs in makers valley</p>
//         </div>
//         <div className={`${styles.holder} ${styles.search}`}>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <p>Search and Filter jobs</p>
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
//                 <p>Job Type</p>
//                 <input 
//                   type="text"
//                   name="tag"
//                   value={formData.tag}
//                   onChange={handleChange}
//                 />
//               </span>
//               <span>
//                 <p>Pay Rate</p>
//                 <input 
//                   type="text"
//                   name="pay"
//                   value={formData.pay}
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

// export default BuilderMarket;

import React, { useState, useMemo } from 'react';
import { MapPin, Home, User, MessageCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './BuilderMarket.module.css';

const allJobs = [
  {
    id: 1,
    title: "Residential Renovation - Kitchen Remodel",
    company: "Valley Construction",
    location: "Makers Valley",
    tags: ["Construction", "Carpentry"],
    pay: 13000,
  },
  {
    id: 2,
    title: "Deck Installation",
    company: "Outdoor Builders",
    location: "Makers Valley",
    tags: ["Construction", "Woodwork"],
    pay: 8000,
  },
  {
    id: 3,
    title: "Bathroom Refit",
    company: "Home Improve Co.",
    location: "East Valley",
    tags: ["Construction", "Plumbing"],
    pay: 15000,
  },
  {
    id: 4,
    title: "Roof Repair",
    company: "RoofMasters",
    location: "West Valley",
    tags: ["Construction", "Roofing"],
    pay: 9500,
  },
  {
    id: 5,
    title: "Garden Landscaping",
    company: "GreenThumb",
    location: "South Valley",
    tags: ["Landscaping"],
    pay: 7000,
  },
  {
    id: 6,
    title: "House Painting",
    company: "ColorItAll",
    location: "North Valley",
    tags: ["Painting"],
    pay: 6000,
  },
  {
    id: 7,
    title: "Floor Tiling",
    company: "TilePros",
    location: "Makers Valley",
    tags: ["Construction", "Tiling"],
    pay: 11000,
  },
];

const JobListing = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPay, setFilterPay] = useState('');

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = filterLocation
        ? job.location === filterLocation
        : true;
      const matchesPay = filterPay
        ? job.pay <= parseInt(filterPay)
        : true;
      return matchesSearch && matchesLocation && matchesPay;
    });
  }, [search, filterLocation, filterPay]);

  const uniqueLocations = [...new Set(allJobs.map(j => j.location))];

  return (
    <div className={styles.page}>
      <h2>Job Listings</h2>
      <p className={styles.subtitle}>
        Find construction and community development jobs in Makers Valley
      </p>

      <div className={styles.filters}>
        <input
          placeholder="Search by title or company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map(loc => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select
          value={filterPay}
          onChange={e => setFilterPay(e.target.value)}
        >
          <option value="">Any Pay</option>
          <option value="7000">≤ R7,000</option>
          <option value="10000">≤ R10,000</option>
          <option value="15000">≤ R15,000</option>
        </select>
        <button
          onClick={() => {
            setSearch('');
            setFilterLocation('');
            setFilterPay('');
          }}
        >
          Clear Filters
        </button>
      </div>

      <p className={styles.label}>
        {filteredJobs.length} Job{filteredJobs.length !== 1 && 's'} Available
      </p>

      <div className={styles.list}>
        {filteredJobs.map(job => (
          <div key={job.id} className={styles.card}>
            <div className={styles.text}>
              <h4>{job.title}</h4>
              <p>{job.company}</p>
              <p>
                <MapPin size={12} /> {job.location}
              </p>
              <div className={styles.tags}>
                {job.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
            <div className={styles.rightSection}>
              <p className={styles.pay}>R {job.pay.toLocaleString()}</p>
              <button className={styles.apply}>Apply Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Bottom Navigation */}
      <div className={styles.bottom_nav}>
        <Home size={24} onClick={() => navigate('/builderDashboard')} />
        <User size={24} onClick={() => navigate('/profile')} />
        <MessageCircle size={24} onClick={() => navigate('/messages')} />
        <Settings size={24} onClick={() => navigate('/settings')} />
      </div>
    </div>
  );
};

export default JobListing;

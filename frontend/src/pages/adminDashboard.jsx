// import {React, useState} from 'react';
// import styles from './adminDashboard.module.css';
// import { Hammer, Home, Check, Wallet } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {

//     const navigate = useNavigate;
//     const [activeMainView, setActiveMainView] = useState('postProject'); 
//     const [projectTab, setProjectTab] = useState('job'); // 'job' or 'housing'
//     const [applicationTab, setApplicationTab] = useState('job'); // 'job' or 'housing'
   
//     const [showAll, setShowAll] = useState(false);
  
//     const user = {
//       name: "John Doe",
//       type: "Admin",
//       email: "johndoe@doe.com",
//       phone: "+27-0000-000000",
//     }
  
   
  
  
   
//     // Placeholder Components
// function JobForm() {
//   return <div>Post a Job Form</div>;
// }

// function HousingForm() {
//   return <div>List Housing Form</div>;
// }

// function JobApplications() {
//   return <div>Job Applications View</div>;
// }

// function HousingApplications() {
//   return <div>Housing Applications View</div>;
// }
    
//     return (
//       <div className={styles.admin_dash}>
//         <div className={styles.admin_inner}>
//           <article className={`${styles.holder} ${styles.profile}`}>
//             <button>Edit Details</button>
//             <div className={styles.icon}>
              
//             </div>
//             <span className={styles.welcome}>
//               <span>Welcome back, {user.name}!</span>
//               <p>{user.type}</p>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//             </span>
//           </article>
  

//           <div className={styles.adminButtons}>
//           <button onClick={() => setActiveMainView('manageApplications')}>Manage All Applications</button>
//           <button onClick={() => setActiveMainView('postProject')}>Post a Project</button>
            
//           </div>
  
//           <div className={`${styles.application_holder} ${styles.holder}`}>
//           {activeMainView === 'postProject' && (
//           <>
//             <div className={styles.tabBar}>
//               <button
//                 className={`${styles.tab} ${projectTab === 'job' ? styles.activeTab : ''}`}
//                 onClick={() => setProjectTab('job')}
//               >
//                 <Hammer size={16} />
//                 Post Job
//               </button>
//               <button
//                 className={`${styles.tab} ${projectTab === 'housing' ? styles.activeTab : ''}`}
//                 onClick={() => setProjectTab('housing')}
//               >
//                  <Home size={16} />
//                 List Housing
//               </button>
//             </div>
//             {projectTab === 'job' ? <JobForm /> : <HousingForm />}
//           </>
//         )}

//         {activeMainView === 'manageApplications' && (
//           <>
//             <div className={styles.tabBar}>
//               <button
//                 className={`${styles.tab} ${applicationTab === 'job' ? styles.activeTab : ''}`}
//                 onClick={() => setApplicationTab('job')}
//               >
//                 <Hammer size={16} />
//                 Job Applications
//               </button>
//               <button
//                 className={`${styles.tab} ${applicationTab === 'housing' ? styles.activeTab : ''}`}
//                 onClick={() => setApplicationTab('housing')}
//               >
//                  <Home size={16} />
//                 Housing Applications
//               </button>
//             </div>
//             {applicationTab === 'job' ? <JobApplications /> : <HousingApplications />}
//           </>
//         )}
//           </div>
//           </div>
//       </div>
//   )
// }

// export default AdminDashboard;

// import React, { useState } from 'react';
// import styles from './adminDashboard.module.css';
// import {
//   Hammer, Home, Check, Wallet, User, Settings, Edit
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeMainView, setActiveMainView] = useState('postProject');
//   const [projectTab, setProjectTab] = useState('job');
//   const [applicationTab, setApplicationTab] = useState('job');

//   const user = {
//     name: "John Doe",
//     type: "Admin",
//     email: "johndoe@doe.com",
//     phone: "+27-0000-000000",
//   };

//   // Placeholder Components
//   function JobForm() {
//     return <div className={styles.mock_view}>Post a Job Form</div>;
//   }
//   function HousingForm() {
//     return <div className={styles.mock_view}>List Housing Form</div>;
//   }
//   function JobApplications() {
//     return <div className={styles.mock_view}>Job Applications View</div>;
//   }
//   function HousingApplications() {
//     return <div className={styles.mock_view}>Housing Applications View</div>;
//   }

//   return (
//     <div className={styles.admin_dash}>
//       <div className={styles.admin_inner}>
//         {/* Profile Section */}
//         <div className={styles.profile_section}>
//           <div className={styles.top_info}>
//             <div className={styles.avatar_default}>
//               <User size={30} />
//             </div>
//             <div className={styles.profile_text_block}>
//               <div className={styles.details}>
//                 <h2>{user.name}</h2>
//                 <p>{user.type}</p>
//                 <p>{user.email}</p>
//               </div>
//               <button className={styles.edit_btn}>
//                 <Edit size={16} /> Edit Details
//               </button>
//             </div>
//           </div>

//           <div className={styles.stats}>
//             <div className={`${styles.stat} ${styles.green}`}>
//               <h3>12</h3>
//               <p>Job Listings</p>
//             </div>
//             <div className={`${styles.stat} ${styles.pink}`}>
//               <h3>4</h3>
//               <p>Housing Listings</p>
//             </div>
//             <div className={`${styles.stat} ${styles.purple}`}>
//               <h3>36</h3>
//               <p>Total Applications</p>
//             </div>
//           </div>
//         </div>

//         {/* Toggle Section */}
//         <div className={styles.toggle_section}>
//           <button
//             className={`${styles.toggle_tab} ${activeMainView === 'manageApplications' ? 'active' : ''}`}
//             onClick={() => setActiveMainView('manageApplications')}
//           >
//             Manage Applications
//           </button>
//           <button
//             className={`${styles.toggle_tab} ${activeMainView === 'postProject' ? 'active' : ''}`}
//             onClick={() => setActiveMainView('postProject')}
//           >
//             Post Project
//           </button>
//         </div>

//         {/* Tabbed Content */}
//         <div className={`${styles.application_holder} ${styles.holder}`}>
//           {activeMainView === 'postProject' && (
//             <>
//               <div className={styles.tabBar}>
//                 <button
//                   className={`${styles.tab} ${projectTab === 'job' ? styles.activeTab : ''}`}
//                   onClick={() => setProjectTab('job')}
//                 >
//                   <Hammer size={16} /> Post Job
//                 </button>
//                 <button
//                   className={`${styles.tab} ${projectTab === 'housing' ? styles.activeTab : ''}`}
//                   onClick={() => setProjectTab('housing')}
//                 >
//                   <Home size={16} /> List Housing
//                 </button>
//               </div>
//               {projectTab === 'job' ? <JobForm /> : <HousingForm />}
//             </>
//           )}

//           {activeMainView === 'manageApplications' && (
//             <>
//               <div className={styles.tabBar}>
//                 <button
//                   className={`${styles.tab} ${applicationTab === 'job' ? styles.activeTab : ''}`}
//                   onClick={() => setApplicationTab('job')}
//                 >
//                   <Hammer size={16} /> Job Applications
//                 </button>
//                 <button
//                   className={`${styles.tab} ${applicationTab === 'housing' ? styles.activeTab : ''}`}
//                   onClick={() => setApplicationTab('housing')}
//                 >
//                   <Home size={16} /> Housing Applications
//                 </button>
//               </div>
//               {applicationTab === 'job' ? <JobApplications /> : <HousingApplications />}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className={styles.bottom_nav}>
//         <Home size={24} onClick={() => navigate('/admin')} />
//         <Hammer size={24} onClick={() => setActiveMainView('postProject')} />
//         <Check size={24} onClick={() => setActiveMainView('manageApplications')} />
//         <User size={24} onClick={() => navigate('/profile')} />
//         <Settings size={24} onClick={() => navigate('/settings')} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState } from 'react';
import styles from './adminDashboard.module.css';
import { Hammer, Home, Check, User, Settings, Edit, MapPin } from 'lucide-react';

// Job Form Component
function JobForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', company: '', location: '', pay: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <form className={styles.form} onSubmit={e => {
      e.preventDefault();
      onSubmit({ ...form, pay: parseInt(form.pay) });
      setForm({ title: '', company: '', location: '', pay: '' });
    }}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required />
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
      <input name="pay" type="number" value={form.pay} onChange={handleChange} placeholder="Pay (R)" required />
      <button type="submit">Post Job</button>
    </form>
  );
}

// Housing Form Component
function HousingForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', location: '', price: '', beds: '', baths: '', size: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <form className={styles.form} onSubmit={e => {
      e.preventDefault();
      onSubmit({ ...form, price: parseInt(form.price), beds: parseInt(form.beds), baths: parseInt(form.baths), size: parseInt(form.size) });
      setForm({ title: '', location: '', price: '', beds: '', baths: '', size: '' });
    }}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price (R)" required />
      <input name="beds" type="number" value={form.beds} onChange={handleChange} placeholder="Beds" required />
      <input name="baths" type="number" value={form.baths} onChange={handleChange} placeholder="Baths" required />
      <input name="size" type="number" value={form.size} onChange={handleChange} placeholder="Size (sq ft)" required />
      <button type="submit">List Housing</button>
    </form>
  );
}

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [houses, setHouses] = useState([]);
  const [activeView, setActiveView] = useState('postProject');
  const [projectTab, setProjectTab] = useState('job');
  const [applicationTab, setApplicationTab] = useState('job');
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
                <h2>{user.name}</h2><p>{user.role}</p><p>{user.email}</p>
              </div>
              <button className={styles.edit_btn}><Edit size={16} /> Edit Details</button>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={`${styles.stat} ${styles.green}`}><h3>{jobs.length}</h3><p>Jobs Posted</p></div>
            <div className={`${styles.stat} ${styles.pink}`}><h3>{houses.length}</h3><p>Housing Posted</p></div>
            <div className={`${styles.stat} ${styles.purple}`}><h3>{jobs.length + houses.length}</h3><p>Total Listings</p></div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.toggle_section}>
          <button className={`${styles.toggle_tab} ${activeView === 'manage' ? 'active' : ''}`} onClick={() => setActiveView('manage')}>Manage Apps</button>
          <button className={`${styles.toggle_tab} ${activeView === 'postProject' ? 'active' : ''}`} onClick={() => setActiveView('postProject')}>Post Project</button>
        </div>

        {/* Content */}
        <div className={`${styles.application_holder} ${styles.holder}`}>
          {activeView === 'postProject' ? (
            <>
              <div className={styles.tabBar}>
                <button className={`${styles.tab} ${projectTab === 'job' ? styles.activeTab : ''}`} onClick={() => setProjectTab('job')}><Hammer size={16} /> Post Job</button>
                <button className={`${styles.tab} ${projectTab === 'housing' ? styles.activeTab : ''}`} onClick={() => setProjectTab('housing')}><Home size={16} /> List Housing</button>
              </div>
              {projectTab === 'job' ? <JobForm onSubmit={handleJobSubmit} /> : <HousingForm onSubmit={handleHouseSubmit} />}
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
        <Check size={24} onClick={() => setActiveView('manage')} />
        <User size={24} onClick={() => { }} />
        <Settings size={24} onClick={() => { }} />
      </div>
    </div>
  );
};

export default AdminDashboard;

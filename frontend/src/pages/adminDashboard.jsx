import React, { useState, useEffect } from 'react';
import styles from './adminDashboard.module.css';
import { Home, User, Settings, Edit, Hammer, Bookmark, MapPin} from 'lucide-react';
import { Link } from 'react-router-dom';
import sampleHouseImg from '../images/makers_valley_house.jpg';


const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [houses, setHouses] = useState([]);
  const [activeView, setActiveView] = useState('postProject');
  const [projectTab, setProjectTab] = useState('job');
  const user = { name: 'John Doe', role: 'Admin', email: 'johndoe@doe.com' };

  const [selectedSkills, setSelectedSkills] = useState([]);
  const allSkills = ["Construction", "Plumbing", "Electrical", "Carpentry", "Painting", "Roofing"];

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const allAmenities = ["Laundry", "Heating", "Air Conditioning", "Wifi"];


  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };
  
  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyOrg: "",
    jobDesc: "",
  });
  const [housingData, setHousingData] = useState({
    propertyTitle: "",
    location: "",
    propertyDesc: "",
    monthlyRent:"",
    bedrooms:"",
    bathrooms:"",
    squareFeet:"",
    imageURL:"",
  });

  const handleChange = (e) => 
  {
    const { name, value } = e.target;

    setJobData({
      ...jobData,
      [name]: value,
    });
  };
  const handleHousingChange = (e) => {
    const { name, value } = e.target;
    setHousingData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleJobSubmit()
  //  This function facilitates the posting of jobs from the admin dashboard
  const handleJobSubmit = async (e) => 
  {
    e.preventDefault();

    const payload = {
      ...jobData,
      requiredSkills: selectedSkills, // Include selected skills
      role: "builder"
    };

    // Optionally: validate here before submitting, return if errors

    console.log("Submitting form data:", { ...jobData, role: "builder" });


    try {
      const response = await fetch("http://localhost:3001/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Response from server:", data);

      if (response.ok) {
        alert(" Job posted successfully!");
        // navigate("/login"); // or wherever you want to redirect
      } else {
        alert(data.message || " Job post failed");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  // handleHouseSubmit()
  //  This function facilitates the posting of House Listings from the Admin Dashboard
  const handleHouseSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      ...housingData,
      amenities: selectedAmenities,
    };
  
    try {
      const response = await fetch("http://localhost:3001/api/housing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Housing listed successfully!");
        setHouses(prev => [...prev, { id: Date.now(), ...payload }]);
      } else {
        alert(data.message || "Housing post failed");
      }
    } catch (error) {
      console.error("Error posting housing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // useEffect()
  //  This function facilitates the fetching of all housing application information
  useEffect(() => {
    const fetchHousingApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/housing-applications');
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Failed to fetch housing applications:', error);
      }
    };

  }, []);



  
  // const handleJobSubmit = job => setJobs(prev => [...prev, { id: Date.now(), ...job }]);
  // const handleHouseSubmit = h => setHouses(prev => [...prev, { id: Date.now(), ...h }]);

// JobForm and HousingForm remain unchanged from your version
// This function contains all of the information for the Job Submit form
function JobForm({ onSubmit }) 
{ 
  return(
   <div className={styles.border}>
      <h2 className={styles.title}> <Hammer size={29} /> Create a Job Listing</h2>
    
    <form onSubmit={handleJobSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.form_group}>
              <label>Job Title</label>
              <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} value={jobData.jobTitle}  />
            </div>
            <div className={styles.form_group}>
              <label>Company Organisation</label>
              <input type="text" name="companyOrg" placeholder="Company Name" onChange={handleChange} value={jobData.companyOrg}  />
            </div>
          </div>

          <div className={styles.form_group} >
            <label>Job Descriptions</label>
            <textarea className={styles.jobDesc} type="text" name="jobDesc" placeholder="Describe the job opportunities requirements and what the builders will be doing." onChange={handleChange} value={jobData.jobDesc}  />
          </div>
          <div className={styles.form_group}>
               <label>Required Skills (Optional) </label>
               <div className="chip-container">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`${styles.chip} ${selectedSkills.includes(skill) ? styles.selected : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </button>
                    ))}
              </div>
          </div>
          <button type="submit" className={styles.submit_btn}>Post Job Listing</button>
    </form>
    
  </div>
  );
}

// This function represents the form for inputting housing information
function HousingForm({ onSubmit })
 {  
  return(
    <div className={styles.border}>
       <h2 className={styles.title}> <Home size={29} /> Create a Housing Listing</h2>
     
     <form onSubmit={handleHouseSubmit} className={styles.form}> 
           <div className={styles.row}>
             <div className={styles.form_group}>
               <label>Property Title</label>
               <input type="text" name="propertyTitle" onChange={handleHousingChange} value={housingData.propertyTitle}  />
             </div>
             <div className={styles.form_group}>
               <label>Location</label>
               <input type="text" name="location" placeholder="e.g. Valley Construction Co" onChange={handleHousingChange} value={housingData.location} />
             </div>
           </div>
 
           <div className={styles.form_group} >
             <label className={styles.label}>Property Description</label>
             <textarea className={styles.jobDesc} type="text" name="propertyDesc" placeholder="Describe the property, its fesatures and what makes it special..." onChange={handleHousingChange} value={housingData.propertyDesc}  />
           </div>

           <div className={styles.row}>
             <div className={styles.form_group}>
               <label>Monthly Rent [R]</label>
               <input type="text" name="monthlyRent" onChange={handleHousingChange} value={housingData.monthlyRent}  />
             </div>
             <div className={styles.form_group}>
               <label>Bedrooms</label>
               <input type="text" name="bedrooms"  onChange={handleHousingChange} value={housingData.bedrooms} />
             </div>
             <div className={styles.form_group}>
               <label>Bathrooms</label>
               <input type="text" name="bathrooms"  onChange={handleHousingChange} value={housingData.bathrooms} />
             </div>
             <div className={styles.form_group}>
               <label>Square Feet</label>
               <input type="text" name="squareFeet"  onChange={handleHousingChange} value={housingData.squareFeet} />
             </div>
           </div>
           <div className={styles.form_group} >
             <label className={styles.label}>Property Image URL (Optional)</label>
             <input type="text" name="imageURL" placeholder='https://example.com/image.jpg' onChange={handleHousingChange} value={housingData.imageURL}  />
           </div>

           <div className={styles.form_group}>
               <label>Amenities (Optional) </label>
               <div className="chip-container">
                {allAmenities.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    className={`${styles.chip} ${selectedAmenities.includes(amenity) ? styles.selected : ''}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </button>
                    ))}
              </div>
          </div>
           
           <button type="submit" className={styles.submit_btn}>Post House Listing</button>
     </form>
     
   </div>
   );
}

// This function contains all of the HTML for building the Job Applications section
function JobApplications({applications}) 
{ 
  return (<div  className={styles.border}>
    <h2 className={styles.title}> <Hammer size={22} /> Job Applications</h2>
    {houses.length === 0 ? (
      <div>
        <p>No housing applications found.</p>
        {/* this bit is just for testing how the css will look*/}
        <div className={styles.cardWrapper}>
        <div className={styles.card}>
            <div className={styles.text}>
              <h4>Residential Renovation - Kitchen Remodel</h4>
              <p>Valley Construction Co </p>
              <p>
                <MapPin size={12} /> Downtown District
              </p>
              <div className={styles.tags}>
                
                  <span >Construction</span>
                
              </div>
            </div>
            <div className={styles.rightSection}>
              <button className={styles.reviewJob}>Review Applications</button>
            </div>
          </div>

          </div>
          </div>

        
      ) : (
        applications.map(app => (
          <div  className={styles.card}>
            <div className={styles.imgWrap}>
              <img  />
              <div className={styles.priceTag}>R </div>
              
            </div>
            <div className={styles.details}>
              <h3></h3>
              <p className={styles.location}></p>
              <p className={styles.description}></p>
              <div className={styles.tags}>
                <span><Home size={14} />  Bed</span>
                <span><Bookmark size={14} /> Bath</span>
                <span><Settings size={14} />  sq ft</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.contact}>Review Applications</button>
            
              </div>
            </div>
          </div>
        ))
      )}

    
  </div>
  );
}
function HouseApplications({applications}) 
{ 
  return (
  <div className={styles.border}>
     <h2 className={styles.title}> <Home size={22} /> Housing Applications</h2>
     {houses.length === 0 ? (
      <div>
        <p>No housing applications found.</p>
        {/* this bit is just for testing how the css will look*/}
        <div className={styles.cardWrapper}>
        <div className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={sampleHouseImg} alt='image'/>
              <div className={styles.priceTag}>R 1400 </div>
              
            </div>
            <div className={styles.details}>
              <h3>Spacious 2BR Home</h3>
              <p className={styles.location}>West Valley</p>
              <p className={styles.description}>Close to shopping centers and schools.</p>
              <div className={styles.tags}>
                <span><Home size={14} /> 4 Bed</span>
                <span><Bookmark size={14} />  2Bath</span>
                <span><Settings size={14} /> 650 sq ft</span>
              </div>
              <div className={styles.actions}>
              <button className={styles.review}>Review Applications</button>
              </div>
            </div>
          </div>
          </div>
          </div>

        
      ) : (
        applications.map(app => (
          <div  className={styles.card}>
            <div className={styles.imgWrap}>
              <img  />
              <div className={styles.priceTag}>R </div>
              
            </div>
            <div className={styles.details}>
              <h3></h3>
              <p className={styles.location}></p>
              <p className={styles.description}></p>
              <div className={styles.tags}>
                <span><Home size={14} />  Bed</span>
                <span><Bookmark size={14} /> Bath</span>
                <span><Settings size={14} />  sq ft</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.contact}>Review Applications</button>
            
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
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

        {/* Tabs */}
        <div className={styles.actions}>
          <button
            className={`${styles.toggle_tab} ${activeView === 'manage' ? styles.active : ''}`}
            onClick={() => setActiveView('manage')}
          >
            Manage all Applications
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
            <div className={styles.intro}>
            <h2>Post a Project</h2>
            <p>Create job opportunities or list housing for the Makers Valley community</p>
            </div>
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
            <div className={styles.mock_view}>
              <div className={styles.intro}>
            <h2>Manage Applications</h2>
            <p>Manage and review all applications and accept or reject.</p>
            </div>
              <div className={styles.tabBar}>
              <button
                  className={`${styles.tab} ${projectTab === 'job' ? styles.activeTab : ''}`}
                  onClick={() => setProjectTab('job')}
                >
                  <Hammer size={16} /> Job Applications
                </button>
                <button
                  className={`${styles.tab} ${projectTab === 'housing' ? styles.activeTab : ''}`}
                  onClick={() => setProjectTab('housing')}
                >
                  <Home size={16} /> Housing Applications
              </button>
              </div>
              {projectTab === 'job'
                ? <JobApplications />
                : <HouseApplications />
              }

              
              </div>
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


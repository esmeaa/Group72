import React from 'react';
import './adminDashboard.css';
import { Hammer, Home } from "lucide-react";


const AdminDashboard = () => {

  return (
     <div className="dashboard">
    

      <main className="main">

        <div className='admin-buttons'>
        <button>Manage All Applications</button>
        <button>Post a Project</button>
        </div>
        <div className="action">
            <h1 className="name">Post a Project</h1>
            <p id='caption'>Create job opportunities or list housing for the Makers Valley community</p>
            <div className="toggle-tabs">
          <button className="tab inactive">
            <Hammer size={16} />
            <span>Post a Job</span>
          </button>
          <button className="tab active">
            <Home size={16} />
            <span>List Housing</span>
          </button>
        </div>
            <div className='dynamic-sec' id='job-sec'>
            <Hammer size={36}/>
            <h1 className='action-title'>Create a job listing</h1>
            <form>
            <div className="row">
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="jobTitle" />
            </div>
            <div className="form-group">
              <label>Company Organisation</label>
              <input type="text" name="companyOrg"  />
            </div>
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <input type="text" name="username"  />
          </div>
          <div className="form-group">
            <label>Job Type </label>
            <input type="text" name="username" />

          </div>


            </form>
            

            </div>

        </div>
        
      
      

        
      </main>
    </div>
  )
}

export default AdminDashboard;
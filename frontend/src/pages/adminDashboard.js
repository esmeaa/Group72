import React from 'react'
import "./adminDashboard.css";
import { Link } from 'react-router-dom'

import { Hammer } from 'lucide-react';
const adminDashboard = () => {
  return (
    <div className="dashboard">
    

      <main className="main">

        <section className="quick-access">
      
          <div className="quick-item">
            <span className="quick-label">My Exercise History</span>
          </div>
          <div className="quick-item">
            <span className="quick-label">Food</span>
          </div>
          <div className="quick-item">
            <span className="quick-label">Community</span>
          </div>
          <div className="quick-item">
            <span className="quick-label">Goals</span>
          </div>
        </section>
        <div className='admin-buttons'>
        <button>Manage All Applications</button>
        <button>Post a Project</button>
        </div>
        <div className="action">
            <h1 className="name">Post a Project</h1>
            <p id='caption'>Create job opportunities or list housing for the Makers Valley community</p>
            <div className='dynamic-sec' id='job-sec'>
            <Hammer size={36}/>
            <h1 className='action-title'>Create a job listing</h1>
            

            </div>

        </div>
        
      
      

        
      </main>
    </div>
  )
}

export default adminDashboard

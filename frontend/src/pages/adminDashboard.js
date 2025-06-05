import React from 'react'
import "./adminDashboard.css";
import { Link } from 'react-router-dom'
import profileIcon from "../images/icons/profile.svg";

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
        <button>Manage All Applications</button>
        <button>Manage All Applications</button>
        <div className="details">
      
            <h1 className="name">Hi John Doe!</h1>
            <button className='editPf'>Edit Profile</button>
        </div>
        
      
      

        
      </main>
    </div>
  )
}

export default adminDashboard

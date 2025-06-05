import React from 'react'
import "./adminDashboard.css";
import { Link } from 'react-router-dom'
import profileIcon from "../images/icons/profile.svg";

const adminDashboard = () => {
  return (
    <div className="dashboard">
    

      <main className="main">
      
        <div className="details">
        <img
            src= {profileIcon}
            alt="Profile"
            className="avatar"
          />
            <h1 className="name">Hi John Doe!</h1>
            <button className='editPf'>Edit Profile</button>
        </div>

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
        

        <section className="recommendations">
          <div className="section-header">
            <h3>Recommendations</h3>
            <a href="#">See All</a>
          </div>
          <div className="cards">
            <div className="card">
              <div className="card-image-container">
                <img
                  src="https://images.unsplash.com/photo-1517130038641-a774d04afb3c"
                  alt="Squat Exercise"
                />
                <div className="play-button">
                
                </div>
              </div>
              <div className="card-info">
                <h4>Squat Exercise</h4>
                <p>
                  <span>12 Minutes</span>
                  <span className="dot">•</span>
                  <span>120 Kcal</span>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-image-container">
                <img
                  src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0"
                  alt="Full Body Stretching"
                />
                <div className="play-button">

                </div>
              </div>
              <div className="card-info">
                <h4>Full Body Stretching</h4>
                <p>
                  <span>12 Minutes</span>
                  <span className="dot">•</span>
                  <span>120 Kcal</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="weekly-challenge">
          <div>
            <h3>Weekly Challenge</h3>
            <p>Plank With Hip Twist</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1616803689943-5601631c7fec"
            alt="Weekly Challenge"
            className="challenge-img"
          />
        </section>

        <section className="articles">
          <div className="section-header">
            <h3>Articles & Tips</h3>
            <a href="#">View All</a>
          </div>
          <div className="cards">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
                alt="Supplement Guide"
              />
              <div className="card-info">
                <h4>Supplement Guide For Beginners</h4>
                <p>Essential nutrients to boost your fitness journey</p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd"
                alt="Daily Routines"
              />
              <div className="card-info">
                <h4>15 Quick & Effective Daily Routines</h4>
                <p>Simple exercises to incorporate into your busy schedule</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default adminDashboard

import { React, useState } from 'react'
import "./builderDashboard.css";
// Create an Action bar to use for all pages

export function BuilderDash() {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [earnings, setEarnings] = useState(0)

  const [showPay, setShowPay] = useState(false)

  const type = "builder"
  const email = "johndoe@doe.com"
  const phone = "+27 0000 000000"

  const getApplications = all => {
    var apps = []
    if (all) {
      return apps
    }
    return apps.slice(0, 3)
  }
  
  return (
    <div className="builder-dash">
      <div className="builder-inner">
        <article id="profile" className="holder">
          <button>Edit Details</button>
          <div className="icon">
          
          </div>
          <span className="welcome">
            <span>Welcome back, John Doe!</span>
            <p>{type}</p>
            <p>{email}</p>
            <p>{phone}</p>
          </span>
        </article>

        <div className="grid_container">
          <div className="holder active">
            <p>Active Projects</p>
            <div className="icon">

            </div>
            <p className="value">{active}</p>
          </div>
          <div className="holder complete">
            <p>Jobs Completed</p>
            <div className="icon">
          
            </div>
            <p className="value">{completed}</p>
          </div>
          <div className="holder pay">
            <p>Total Earnings</p>
            <div className="icon">
            
          </div>
            <p className="value">R {earnings}</p>
            <button onClick=""> View Playslip</button>
          </div>
          <div className="holder switch">
            <p>Browse housing & apply your rent credit</p>
            <button onClick="">Switch to Housing View</button>
          </div>
        </div>

        <div className="holder">
          <p>Skills</p>
          <div className="flex_container">
            <div className="flex_item">Engineering</div>
            <div className="flex_item">Engineering</div>
            <div className="flex_item">Engineering</div>
            <div className="flex_item">Engineering</div>
            <div className="flex_item">Engineering</div>
            <button className="flex_item">+Add Skill</button>
          </div>
        </div>

        <div className="application_holder holder">
          <p>My Job Applications</p>
          <button onClick="">View All</button>
          <div className="application pending">
            <p>Test</p>
            <p className="status">Pending</p>
          </div>
          <div className="application approved">
            <p>Test</p>
            <p className="status">Approved</p>
          </div>
          <div className="application denied">
            <p>Test</p>
            <p className="status">Denied</p>
          </div>
        </div>
      </div>
    </div>
  )
}

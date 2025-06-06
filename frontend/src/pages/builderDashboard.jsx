import { React, useState } from 'react'
import styles from "./builderDashboard.module.css";
// Create an Action bar to use for all pages

function BuilderDash() {
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
    <div className={styles.builder_dash}>
      <div className={styles.builder_inner}>
        <article id={styles.profile} className={styles.holder}>
          <button>Edit Details</button>
          <div className={styles.icon}>
          
          </div>
          <span className={styles.welcome}>
            <span>Welcome back, John Doe!</span>
            <p>{type}</p>
            <p>{email}</p>
            <p>{phone}</p>
          </span>
        </article>

        <div className={styles.grid_container}>
          <div className={`${styles.holder} ${styles.active}`}>
            <p>Active Projects</p>
            <div className={styles.icon}>

            </div>
            <p className={styles.value}>{active}</p>
          </div>
          <div className={`${styles.holder} ${styles.complete}`}>
            <p>Jobs Completed</p>
            <div className={styles.icon}>
          
            </div>
            <p className={styles.value}>{completed}</p>
          </div>
          <div className={`${styles.holder} ${styles.pay}`}>
            <p>Total Earnings</p>
            <div className={styles.icon}>
            
            </div>
            <p className={styles.value}>R {earnings}</p>
            <button onClick=""> View Playslip</button>
          </div>
          <div className={`${styles.holder} ${styles.switch}`}>
            <p>Browse housing & apply your rent credit</p>
            <button onClick="">Switch to Housing View</button>
          </div>
        </div>

        <div className={styles.holder}>
          <p>Skills</p>
          <div className={styles.flex_container}>
            <div className={styles.flex_item}>Engineering</div>
            <div className={styles.flex_item}>Engineering</div>
            <div className={styles.flex_item}>Engineering</div>
            <div className={styles.flex_item}>Engineering</div>
            <div className={styles.flex_item}>Engineering</div>
            <button className={styles.flex_item}>+Add Skill</button>
          </div>
        </div>

        <div className={`${styles.application_holder} ${styles.holder}`}>
          <p>My Job Applications</p>
          <button onClick="">View All</button>
          <div className={`${styles.application} ${styles.pending}`}>
            <p>Test</p>
            <p className={styles.status}>Pending</p>
          </div>
          <div className={`${styles.application} ${styles.approved}`}>
            <p>Test</p>
            <p className={styles.status}>Approved</p>
          </div>
          <div className={`${styles.application} ${styles.denied}`}>
            <p>Test</p>
            <p className={styles.status}>Denied</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuilderDash;

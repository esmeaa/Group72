import React, {useState} from 'react'
import styles from "./adminDashboard.module.css";
import { Link } from 'react-router-dom'

import { Hammer, Home} from 'lucide-react';
const adminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>
        <div className={styles.admin_buttons}>
          <button>Manage All Applications</button>
          <button>Post a Project</button>
        </div>
        <div className={styles.action}>
          <h1 className={styles.name}>Post a Project</h1>
          <p id={styles.caption}>Create job opportunities or list housing for the Makers Valley community</p>
          <div className={styles.toggle_tabs}>
            <button className={`${styles.tab} ${styles.inactive}`}>
              <Hammer size={16} />
              <span>Builder</span>
            </button>
            <button className={`${styles.tab} ${styles.active}`}>
              <Home size={16} />
              <span>Home Seeker</span>
            </button>
          </div>
          <div className={styles.dynamic_sec} id={styles.job_sec}>
            <Hammer size={36}/>
            <h1 className={styles.action_title}>Create a job listing</h1>
            <form>
              <div className={styles.row}>
                <div className={styles.form_group}>
                  <label>Job Title</label>
                  <input type="text" name="jobTitle" />
                </div>
                <div className={styles.form_group}>
                  <label>Company Organisation</label>
                  <input type="text" name="companyOrg"  />
                </div>
              </div>
              <div className={styles.form_group}>
                <label>Username</label>
                <input type="text" name="username"  />
              </div>
              <div className={styles.form_group}>
                <label>Username</label>
                <input type="text" name="username" />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default adminDashboard

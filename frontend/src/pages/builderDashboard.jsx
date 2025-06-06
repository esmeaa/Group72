import { React, useState } from 'react'
import styles from "./builderDashboard.module.css";
import { Hammer, Check, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Create an Action bar to use for all pages

function BuilderDash() {
  const navigate = useNavigate;
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const [showPay, setShowPay] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const type = "builder";
  const email = "johndoe@doe.com";
  const phone = "+27-0000-000000";

  const application1 = {
    title: "Screaming",
    status: "denied",
  }

  const application2 = {
    title: "Shouting",
    status: "approved",
  }

  const application3 = {
    title: "Screeching",
    status: "pending",
  }

  const application4 = {
    title: "Shouting",
    status: "approved",
  }

  const addSkill = (skill) => {
    return;
  };

  const getApplications = () => {
    var apps = [application1, application2, application3, application4];
    if (showAll) {
      return apps;
    }
    return apps.slice(0, 3);
  };
  
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
              <Hammer size={40}/>
            </div>
            <p className={styles.value}>{active}</p>
          </div>
          <div className={`${styles.holder} ${styles.complete}`}>
            <p>Jobs Completed</p>
            <div className={styles.icon}>
              <Check size={40}/>
            </div>
            <p className={styles.value}>{completed}</p>
          </div>
          <div className={`${styles.holder} ${styles.pay}`}>
            <p>Total Earnings</p>
            <div className={styles.icon}>
              <Wallet size={40}/>
            </div>
            <p className={styles.value}>R {earnings}</p>
            <button onClick=""> View Playslip</button>
          </div>
          <div className={`${styles.holder} ${styles.switch}`}>
            <p>Browse housing & apply your rent credit</p>
            <button onClick={() => navigate("/HomeSeekerDashboard")}>Switch to Housing View</button>
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
            <button onClick="" className={styles.flex_item}>+Add Skill</button>
          </div>
        </div>

        <div className={`${styles.application_holder} ${styles.holder}`}>
          <p>My Job Applications</p>
          <button onClick={() => {setShowAll(!showAll)}}>View All</button>
          {getApplications().map((application) => {
            const appStatus = application.status;
            return (
            <div className={`${styles.application} ${styles[appStatus]}`}>
              <p>{application.title}</p>
              <p className={styles.status}>{appStatus}</p>
            </div>
            )
            })}
        </div>
      </div>
    </div>
  )
}

export default BuilderDash;

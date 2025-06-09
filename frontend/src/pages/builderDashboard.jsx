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

  const user = {
    name: "John Doe",
    type: "Builder",
    email: "johndoe@doe.com",
    phone: "+27-0000-000000",
  }

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

  const payment = {
    id: "41ds1231d",
    info: "Kitchen Remodel",
    type: "remodel",
    payment: "24000",
  }

  
  // async function getPayments() {
  //   const response = await (fetch("http://localhost:3001/api/payments"));
  //   const data = await response.json();
  //   return data.payments;
  // }

  // Add skill to builder user
  async function addSkill(skill) {
    await fetch("http://localhost:3001/api/skill", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(skill),
    });
  }

  const getPayments = () => {
    var payments = [payment];
    return payments;
  }

  const getPaymentsContent = () => {
    const payments = getPayments();
    if(!payments.length) {
      return (<p>No Due Payments!</p>)
    }
    return (
      <div>
        <p>My Due Payments {payments.length}</p>
        {payments.map((payment) => {
          return (
            <div className={`${styles.holder} ${styles.payment}`}>
              <div className={styles.payment_item}>
                <div className={styles.text}>
                  <p className={styles.subtle}>Job ID: {payment.id}</p>
                  <p>{payment.info}</p>
                  <p>{payment.type}</p>
                </div>
                <div className={styles.text}>
                  <p className={styles.subtle}>PAY:</p>
                  <p>{payment.payment}</p>
                </div>
              </div>
              <div className={`${styles.button} ${styles.payment_item}`}>
                <button>Cash Out</button>
                <button>Add to Rent Credit</button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // async function getApplications() {
  //   const response = await (fetch("http://localhost:3001/api/applications"));
  //   const data = await response.json();
  //   return data.applications;
  // }

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
        <article className={`${styles.holder} ${styles.profile}`}>
          <button>Edit Details</button>
          <div className={styles.icon}>
            
          </div>
          <span className={styles.welcome}>
            <span>Welcome back, {user.name}!</span>
            <p>{user.type}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </span>
        </article>

        <div className={styles.grid_container}>
          <div className={`${styles.holder} ${styles.active}`}>
            <p>Active Projects</p>
            <div className={styles.icon}>
              <Hammer size={30}/>
            </div>
            <p className={styles.value}>{active}</p>
          </div>
          <div className={`${styles.holder} ${styles.complete}`}>
            <p>Jobs Completed</p>
            <div className={styles.icon}>
              <Check size={30}/>
            </div>
            <p className={styles.value}>{completed}</p>
          </div>
          <div className={`${styles.holder} ${styles.pay}`}>
            <p>Total Earnings</p>
            <div className={styles.icon}>
              <Wallet size={30}/>
            </div>
            <p className={styles.value}>R {earnings}</p>
            <button onClick={() => {setShowPay(true)}}>View Playslip</button>
          </div>
          <div className={`${styles.holder} ${styles.switch}`}>
            <p>Browse housing & apply your rent credit</p>
            <button onClick={() => navigate("/HomeSeekerDashboard")}>Housing View</button>
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
      {showPay === true ? 
        <div className={styles.modal}>
          <div className={styles.modal_content}> 
            <div>
              <article className={styles.profile}>
                <div className={styles.icon}>
            
                </div>
                <p>{user.name}</p>
                <p>Total PayoutL: R 0</p>
                <p>Current Rent Credit: R 0</p>
              </article>
              {getPaymentsContent()}
            </div>
            <button onClick={() => {setShowPay(false)}}>Close</button>
          </div>
        </div>
      : null }
    </div>
  )
}

export default BuilderDash;

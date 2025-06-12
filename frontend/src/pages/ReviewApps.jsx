import React from 'react'
import styles from "./ReviewApps.module.css";
import { User } from "lucide-react";

const ReviewApps = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar_default}><User size={30} /></div>
          <div>
            <h3>John Doe</h3>
            <p><strong>Residential Renovation - Kitchen Remodel</strong></p>
            <p className={styles.jobId}><span>Job ID -</span> A8716ZJA1</p>
          </div>
        </div>

        <div className={styles.filterTabs}>
          <button className={styles.tabActive}>Plumbing</button>
          <button className={styles.tab}>Electrical</button>
        </div>

        <p className={styles.subheading}>Applications (3):</p>

        {/* Application 1 */}
        <div className={`${styles.applicationCard} ${styles.cardAccepted}`}>
          <p className={styles.appId}>Application ID: A8716ZJA1</p>
          <p>Username: <strong>John.doe@email.com</strong></p>
          <div className={styles.skillTag}>Plumbing</div>
          <div className={styles.actionButtons}>
            <button className={styles.statusAccepted}>Accepted</button>
            <button className={styles.contactBtn}>Contact Builder</button>
            <button className={styles.rejectBtn}>Reject</button>
          </div>
        </div>

        {/* Application 2 */}
        <div className={`${styles.applicationCard} ${styles.cardPending}`}>
          <p className={styles.appId}>Application ID: A8716ZJA1</p>
          <p>Username: <strong>John.doe@email.com</strong></p>
          <div className={styles.skillTag}>Electrical</div>
          <div className={styles.actionButtons}>
            <button className={styles.acceptBtn}>Accept</button>
            <button className={styles.rejectBtn}>Reject</button>
          </div>
        </div>

        {/* Application 3 */}
        <div className={`${styles.applicationCard} ${styles.cardRejected}`}>
          <p className={styles.appId}>Application ID: A8716ZJA1</p>
          <p>Username: <strong>John.doe@email.com</strong></p>
          <div className={styles.skillTag}>Roofing</div>
          <div className={styles.actionButtons}>
            <button className={styles.acceptBtn}>Accept</button>
            <button className={styles.rejectBtn}>Reject</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ReviewApps;


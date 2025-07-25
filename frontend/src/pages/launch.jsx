import React from 'react'
import hands from "../images/logo/hands.png";
import house from "../images/logo/house.png";
import title from "../images/logo/ubuntuTitle.png";
import styles from "./launch.module.css";


const launch = () => {
  return (
    <div>
      <img src={title} alt='title' id={styles.title}></img>
      <img src={house} alt='house' id={styles.house}></img>
      <img src={hands} alt='hands' id={styles.hands}></img>
    </div>
  )
}

export default launch;

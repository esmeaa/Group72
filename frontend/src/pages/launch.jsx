

import React from 'react';
import { useNavigate } from 'react-router-dom';
import hands from '../images/logo/hands.png';
import house from '../images/logo/house.png';
import title from '../images/logo/ubuntuTitle.png';
import styles from './launch.module.css';

const Launch = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.launch_container} onClick={handleClick}>
      <img src={title} alt="Ubuntu Homes Title" className={styles.title} />
      <img src={house} alt="House Icon" className={styles.house} />
      <img src={hands} alt="Helping Hands Icon" className={styles.hands} />
    </div>
  );
};

export default Launch;

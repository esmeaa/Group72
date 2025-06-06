
import React from 'react';
import styles from './App.module.css';
import {Routes, Route} from "react-router-dom"; 
import TempNav from './tempNav';
import LoginPage from './pages/LoginPage';
import Launch from './pages/launch';
import Admin from './pages/adminDashboard';
import HomeSeekerRegister from './pages/HomeSeekerRegister';
import BuilderRegister from './pages/BuilderRegister';
import AdminRegister from './pages/AdminRegister';
import BuilderDash from './pages/builderDashboard';


function App() {
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <TempNav />
      </header>
      <Routes>
        <Route path='/launch' element={<Launch/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/builderDashboard' element={<BuilderDash/>}/>
        <Route path='/HomeSeekerRegister' element={<HomeSeekerRegister/>}/>
        <Route path='/BuilderRegister' element={<BuilderRegister/>}/>
        <Route path='/AdminRegister' element={<AdminRegister/>}/> 
      </Routes> 
    </div>
  );
}

export default App;

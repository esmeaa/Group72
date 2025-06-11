// import React from 'react';
// import styles from './App.module.css';
// import { Routes, Route } from 'react-router-dom';
// import Navigation from './components/Navigation';
// import LoginPage from './pages/LoginPage';
// import Launch from './pages/launch';
// import Admin from './pages/adminDashboard';
// import BuilderDash from './pages/builderDashboard';
// import HomeSeekerDashboard from './pages/HomeSeekerDashboard';
// import BuilderMarket from './pages/BuilderMarket';
// import HomeMarket from './pages/HomeMarket';
// import HomeSeekerRegister from './pages/HomeSeekerRegister';
// import BuilderRegister from './pages/BuilderRegister';
// import AdminRegister from './pages/AdminRegister';
// import EditProfile from './pages/editProfile';  
// import ViewPayslip from './pages/ViewPayslip';
// import ChatBox from './ChatBox';
// import useLocalStorage from 'use-local-storage';

// function App() {
//   const [theme] = useLocalStorage('theme');

//   return (
//     <div className={styles.App} data-theme={theme}>
//       <header className={styles.App_header}>
//         <Navigation />
//       </header>
//       <Routes>
//         <Route path='/launch' element={<Launch/>}/>
//         <Route path='/login' element={<LoginPage/>}/>
//         <Route path='/admin' element={<Admin/>}/>
//         <Route path='/builderDashboard' element={<BuilderDash/>}/>
//         <Route path='/HomeSeekerDashboard' element={<HomeSeekerDashboard/>}/>
//         <Route path='/BuilderMarket' element={<BuilderMarket/>}/>
//         <Route path='/HomeMarket' element={<HomeMarket/>}/>
//         <Route path='/HomeSeekerRegister' element={<HomeSeekerRegister/>}/>
//         <Route path='/BuilderRegister' element={<BuilderRegister/>}/>
//         <Route path='/AdminRegister' element={<AdminRegister/>}/> 
//         <Route path='/Profile' element={<EditProfile/>}/>
//         <Route path='/ViewPayslip' element={<ViewPayslip/>}/>
//         <Route path='/ChatBox' element={<ChatBox/>}/>
//         <Route path="*" element={<p>404 - Page Not Found</p>} />
//       </Routes> 
//     </div>
//   );
// }

// export default App;


import React from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom'; 
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import Launch from './pages/launch';
import Admin from './pages/adminDashboard';
import BuilderDash from './pages/builderDashboard';
import HomeSeekerDashboard from './pages/HomeSeekerDashboard';
import BuilderMarket from './pages/BuilderMarket';
import HomeMarket from './pages/HomeMarket';
import HomeSeekerRegister from './pages/HomeSeekerRegister';
import BuilderRegister from './pages/BuilderRegister';
import AdminRegister from './pages/AdminRegister';
import EditProfile from './pages/editProfile';  
import ViewPayslip from './pages/ViewPayslip';
import ChatBox from './ChatBox';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/builderDashboard" element={<BuilderDash />} />
        <Route path="/HomeSeekerDashboard" element={<HomeSeekerDashboard />} />
        <Route path="/BuilderMarket" element={<BuilderMarket />} />
        <Route path="/HomeMarket" element={<HomeMarket />} />
        <Route path="/HomeSeekerRegister" element={<HomeSeekerRegister />} />
        <Route path="/BuilderRegister" element={<BuilderRegister />} />
        <Route path="/AdminRegister" element={<AdminRegister />} /> 
        <Route path="/Profile" element={<EditProfile />} />
        <Route path="/ViewPayslip" element={<ViewPayslip />} />
        <Route path="/ChatBox" element={<ChatBox />} />
        <Route path="*" element={<p>404 - Page Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
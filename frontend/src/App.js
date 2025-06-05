
import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom"; 
import LoginPage from './pages/LoginPage';
import Launch from './pages/launch';
import Admin from './pages/adminDashboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">

        
       <Routes>
      <Route path='/launch' element={<Launch/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/admin' element={<Admin/>}/>
      </Routes> 

      </header>
    </div>
  );
}

export default App;

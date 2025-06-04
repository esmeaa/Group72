<<<<<<< Updated upstream

=======
import React from 'react';
import LoginPage from './LoginPage';
>>>>>>> Stashed changes
import './App.css';
import Launch from './pages/launch';
import AdminDashboard from './pages/adminDashboard';
import {Routes, Route} from "react-router-dom"; 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/launch" element={<Launch />}/>
          <Route path="/adminDashboard" element={<AdminDashboard />}/>
        </Routes>
      
      </header>
    </div>
  );
}

export default App;

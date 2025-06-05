import React from 'react';
import LoginPage from './pages/LoginPage';
import HomeSeekerRegister from './pages/HomeSeekerRegister';
import BuilderRegister from './pages/BuilderRegister';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BuilderRegister />
        <LoginPage />
        <HomeSeekerRegister />
      </header>
    </div>
  );
}

export default App;

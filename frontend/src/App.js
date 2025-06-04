
import './App.css';
import Launch from './pages/launch';
import {Routes, Route} from "react-router-dom"; 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/launch" element={<Launch />}/>
        </Routes>
      
      </header>
    </div>
  );
}

export default App;

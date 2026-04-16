import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'
import Profile from './pages/profile.jsx'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

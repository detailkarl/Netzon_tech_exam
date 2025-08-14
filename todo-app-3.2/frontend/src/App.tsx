import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/privacypolicy" style={{ marginRight: '10px' }}>Privacy Policy</Link>
        <Link to="/tos">Terms of Service</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/tos" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
};

export default App;

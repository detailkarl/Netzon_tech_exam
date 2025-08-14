import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="todo-list">
      <h2>Privacy Policy</h2>
      <p>Privacy Policy Page here.</p>
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default PrivacyPolicy;
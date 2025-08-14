import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="todo-list">
      <h2>Terms of Service</h2>
      <p>Terms of service page here.</p>
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default TermsOfService;

import React from 'react';
import { Link } from 'react-router-dom';
import './ClassSelector.css';

const ClassSelector = () => {
  return (
    <div className="class-selector">
      <h1>اختر الفصل</h1>
      <div className="button-container">
        <Link to="/simulator/class/4" className="class-button"> 3 APIC 4 </Link>
        <Link to="/simulator/class/5" className="class-button"> 3 APIC 5 </Link>
        <Link to="/simulator/class/6" className="class-button"> 3 APIC 6 </Link>
      </div>
    </div>
  );
};

export default ClassSelector;

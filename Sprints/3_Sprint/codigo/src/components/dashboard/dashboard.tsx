import React from 'react';

import './dashboard.css'
import Navbar from '../navbar/navbar';

const Dashboard: React.FC = () => {
  return (
    <>
    <Navbar />
     <div className="container">
            <div className="cubo"></div>
            <div className="cubo"></div>
            <div className="cubo"></div>
            <div className="cubo"></div>
            <div className="cubao"></div>
        </div>
    </>
  )  
}

export default Dashboard;
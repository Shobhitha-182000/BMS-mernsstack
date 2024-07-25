import React from 'react';
import './Home.css';
import Billing from '/images/billing.jpg';
import Lottie from 'react-lottie';
import AnimationData from './Animation - 1721890018482.json';
import Immensphere from '/images/immensphere.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
const Navigate=useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='home-container'>
      <div className="top-nav">
        <div className="left-side-logo"><img src={Immensphere}/></div>
        <button className="login" onClick={()=>Navigate('./login')}> Login </button>
        <button className="signup" onClick={()=>Navigate('./signup')}> Signup </button>
      </div>
      <div className="main-content">
        <div className="left-side-content">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="right-side-content">
          <h1 className="right-content-description">
            Develop a comprehensive Billing Management System tailored for small and medium-sized businesses.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

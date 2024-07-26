import React, { useState } from 'react';
import './Home.css';
import Lottie from 'react-lottie';
import AnimationData from './Animation - 1721890018482.json';
import Immensphere from '/images/immensphere.jpg';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';

const Home = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleLoginClick = () => {
    setLoginOpen(!isLoginOpen);
    setSignupOpen(false);  
  };

  const handleSignupClick = () => {
    setSignupOpen(!isSignupOpen);
    setLoginOpen(false);   
  };

  return (
    <div className='home-container'>
      <div className="top-nav">
        <div className="left-side-logo">
          <img src={Immensphere} alt="Immensphere Logo" />
        </div>
        <button className="login" onClick={handleLoginClick}> 
          {isLoginOpen ? 'Close Login' : 'Login'} 
        </button>
        <button className="signup" onClick={handleSignupClick}> 
          {isSignupOpen ? 'Close Signup' : 'Signup'} 
        </button>
      </div>
      {isLoginOpen && <Login />}
      {isSignupOpen && <Signup />}
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import GenerateInvoice from '../Invoice/GenerateInvoice';
import GetInvoice from '../DisplayInvoices/GetInvoice';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [isGenerateOpen, setGenerateOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem('username');
        if (name) {
            setUserName(name);
        } else {
            alert("There is no user found here please login ");
            navigate('/login');
        }
    }, [navigate]);

    const generateHandler = () => {
        setGenerateOpen(prev => !prev);
        if (!isGenerateOpen) {
            navigate('/user/saveinvoice');
        }
    };

    const handleFileChange = () => {
        navigate('/pdf');
    };

    const getInvoiceHandler = () => {
        navigate('/user/getinvoice');
    };

    return (
        <div className="dashboard-container">
            <div className="top-nav">
                <div className="image-logo">
                    <img src='/images/immensphere.jpg' alt='company logo' /> <b>{userName}</b>
                </div>
                <div className="invoice">
                    <button onClick={getInvoiceHandler} className='getinvoice'>Get Invoice</button>
                    <button className="generate" onClick={generateHandler}>
                        {isGenerateOpen ? 'Close' : 'Generate'}
                    </button>
                </div>
                <div className="nav-right-side">
                    
                    <div className="upload">
                        <button onClick={handleFileChange} style={{ border: 'none' }}>
                            <FaCloudUploadAlt /> Upload a file
                        </button>
                    </div>
                </div>
            </div>
            <div className="main-content">
                {isGenerateOpen && <GenerateInvoice />}
                <label className="custom-file-upload">
                    <button onClick={handleFileChange} style={{ border: 'none', backgroundColor: 'rgb(164, 226, 164)' }}>
                        <FaCloudUploadAlt style={{ height: '100px', width: '100px' }} /> <h3>Upload a file only in jpg</h3>
                    </button>
                </label>
            </div>
        </div>
    );
};

export default Dashboard;

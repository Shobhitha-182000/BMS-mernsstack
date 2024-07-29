import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import GenerateInvoice from '../Invoice/GenerateInvoice';
import GetInvoice from '../DisplayInvoices/GetInvoice';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const Navigate = useNavigate();
    const [isGenerateOpen, setGenerateOpen] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem('username');
        console.log("dashboard username", name);
        if (name) {
            setUserName(name);  
        } else {
            alert("There is no user found here please login ");
            Navigate('/login');
        }
    }, [Navigate]);

    const generateHandler = () => {
        setGenerateOpen(!isGenerateOpen);
        if (!isGenerateOpen) {
            // Navigate only if the state is being opened
            Navigate('/user/saveinvoice');
        }
    }

    return (
        <div className="dashboard-container">
            <div className="top-nav">
                <img src='/images/immensphere.jpg' alt='company logo'/> <b>{userName}</b>
                <div className="invoice" style={{marginLeft:'300px',marginTop:'20px'}}><GetInvoice/></div>
                <div className="nav-right-side">
                  
                    <button className="generate" onClick={generateHandler}>
                        {isGenerateOpen ? 'Close' : 'Generate'}
                    </button>
                    <div className="upload">
                        <label>
                            <FaCloudUploadAlt /> Upload a file
                        </label>
                        <input type="file" />
                    </div>
                </div>
            </div>
            <div className="main-content">
                {isGenerateOpen && <GenerateInvoice />}
                <label className="custom-file-upload" htmlFor="file-input">
                    <FaCloudUploadAlt style={{ height: '100px', width: '100px' }} /> Upload a file only in jpg, txt
                </label>
                <input type="file" id="file-input" style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default Dashboard;

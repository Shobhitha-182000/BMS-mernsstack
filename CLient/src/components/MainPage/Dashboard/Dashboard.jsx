import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import GenerateInvoice from '../Invoice/GenerateInvoice';
import GetInvoice from '../DisplayInvoices/GetInvoice';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [isGenerateOpen, setGenerateOpen] = useState(false);
    const [file, setFile] = useState(null);  
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
        setGenerateOpen(!isGenerateOpen);
        if (!isGenerateOpen) {
            navigate('/user/saveinvoice');
        }
    }

    const handleFileChange = (event) => {
        navigate('/pdf');
        
      
    };

    const getInvoiceHandler = () => {
        navigate('/user/getinvoice');
    }

    return (
        <div className="dashboard-container">
            <div className="top-nav">
                <div className="image-logo">
                    <img src='/images/immensphere.jpg' alt='company logo'/> <b>{userName}</b>
                </div>
                 
                
                <div className="invoice" style={{ marginLeft: '300px', marginTop: '20px' }}>
                     <button onClick={getInvoiceHandler} className='getinvoice'>Get Invoice</button>
                </div>
                <div className="nav-right-side">
                    <button className="generate" onClick={generateHandler}>
                        {isGenerateOpen ? 'Close' : 'Generate'}
                    </button>
                    <div className="upload">
                        <button onClick={handleFileChange} style={{border:'none'}}>
                            <FaCloudUploadAlt /> Upload a file
                        </button>
                        {/* <input type="file" accept=".jpg, .jpeg" onChange={handleFileChange} /> */}
                    </div>
                </div>
            </div>
            <div className="main-content">
                {isGenerateOpen && <GenerateInvoice />}
                <label className="custom-file-upload">
                <button onClick={handleFileChange} style={{border:'none',backgroundColor:' rgb(164, 226, 164)'}}>
                    <FaCloudUploadAlt style={{ height: '100px', width: '100px' }} /> <h3>Upload a file only in jpg</h3>
      </button>
                </label>
            </div>
        </div>
    );
};

export default Dashboard;

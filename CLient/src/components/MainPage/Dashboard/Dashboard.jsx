import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaCloudUploadAlt, FaRegUserCircle } from "react-icons/fa";
import GenerateInvoice from '../Invoice/GenerateInvoice';
import axios from 'axios';
import graph from './graph.jpg';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [isGenerateOpen, setGenerateOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [logoutPosition, setLogoutPosition] = useState({ top: 0, left: 0 });
    const userIconRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const name = localStorage.getItem('username');
            if (name) {
                setUserName(name);
                try {
                    const response = await axios.get('http://localhost:3000/user/invoice');
                    setInvoices(response.data.data);
                    console.log(response.data.data);
                } catch (error) {
                    console.error("Error fetching invoices:", error);
                }
            } else {
                alert("There is no user found here, please login.");
                navigate('/login');
            }
        };
        fetchUserData();
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleLogout = () => {
        if (userIconRef.current) {
            const { top, left, height } = userIconRef.current.getBoundingClientRect();
            setLogoutPosition({
                top: top + height + window.scrollY,
                left: left + window.scrollX
            });
        }
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <div className="dashboard-container">
            <div className="top-nav">
                <div className="image-logo">
                    <div className="image-logo1">
                        <FaRegUserCircle  size={30} onClick={handleLogout} ref={userIconRef} />
                        {showLogoutConfirm && (
                            <div className="logout-confirm" style={{ top: logoutPosition.top, left: logoutPosition.left }}>
                                <p>Are you sure you want to logout?</p>
                                <button onClick={confirmLogout}>Yes</button>
                                <button onClick={cancelLogout}>Cancel</button>
                            </div>
                        )}
                    </div>
                    <div className="username"><b>{userName}</b></div>
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
                <div className="content-wrapper">
                    <div className="billing-info">
                        <div className="billing-column">
                            <h3>Billing Information</h3>
                            <p>
                                Here you can generate invoices and manage your billing records.
                            </p>
                        </div>
                        <div className="billing-column">
                            <h3>Additional Info</h3>
                            <p>
                                Use the 'Generate' button to create a new invoice and 'Get Invoice' to view or download your previous invoices.
                            </p>
                        </div>
                        <div className="billing-column">
                            <h3>Contact Information</h3>
                            <p>
                                For any queries, please contact us at support@example.com.
                            </p>
                        </div>
                        <div className="billing-column">
                            <h3>Payment Methods</h3>
                            <p>
                                We accept various payment methods including credit cards and PayPal.
                            </p>
                        </div>
                    </div>
                    <div className="invoice-table">
                        <div className="image">
                            <img src={graph} alt="graph" />
                        </div>
                        <div className="file-upload-section">
                            <label className="custom-file-upload">
                                <button onClick={handleFileChange} style={{ border: 'none', backgroundColor: "#fff" }}>
                                    <FaCloudUploadAlt style={{ height: '100px', width: '80px' }} />
                                    <h3>Upload a file only in jpg</h3>
                                </button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-display">
                <h3>Invoice Records:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length > 0 ? (
                            invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.invoice_no}</td>
                                    <td>{formatDate(invoice.date)}</td>
                                    <td>{invoice.total}</td>
                                    <td><button className="download-btn" onClick={getInvoiceHandler}>Download</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No invoices found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

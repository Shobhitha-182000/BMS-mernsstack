import React, { useState } from 'react';
import axios from 'axios';
import './GetInvoice.css'; 
import { FaDownload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoMdDownload } from "react-icons/io";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GetInvoice = () => {
    const navigate = useNavigate();
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState(null);

    const clickHandler = async () => {
        try {
            navigate('/user/getinvoice');
            const response = await axios.get(`http://localhost:3000/user/invoice/${invoiceNo}`);
            console.log(response.data.data);
            setInvoiceData(response.data.data);
            setError(null);
        } catch (error) {
            setError('Invoice not found or error fetching data.');
            console.log(error);
            setInvoiceData(null);
        }
    };

    const safeJsonParse = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return [];
        }
    };

    const safeToFixed = (value, decimals = 2) => {
        if (typeof value === 'number') {
            return value.toFixed(decimals);
        }
        return '0.00';
    };

    const downloadPDF = () => {
        const input = document.getElementById('invoice-to-print');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${invoiceData.invoice_no}.pdf`);
        });
    };

    return (
        <div className="getInvoice-container">
            <label>Enter Invoice Number</label>
            <input
                type='text'
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder='Enter a invoice'
            />
            <button onClick={clickHandler}>Get</button>

            {error && <p className="error">{error}</p>}
            
            {invoiceData && (
                <div id="invoice-to-print" className="invoice-display">
                    <h2>Invoice Details
                        <div className="download">
                            <IoMdDownload
                                title='Download PDF'
                                onClick={downloadPDF}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </h2>

                    <div className="invoice-section-side">
                        <img src={`/files/${invoiceData.logo}`} alt='logo'/>
                        <div className="invoice-section-1">
                            <h3>Invoice No:</h3>
                            <h3>{invoiceData.invoice_no}</h3>
                        </div>
                    </div>
                    <div className="invoice-info">
                        <div className="invoice-section-second">
                            <div className="invoice-section-2">
                                <h3>Company:</h3>
                                <p>{invoiceData.company}</p>
                            </div>
                            <div className="invoice-section-3">
                                <h3>Bill To:</h3>
                                <p>{invoiceData.bill_to}</p>
                            </div>
                        </div>
                        <div className="invoice-section-third">
                            <div className="invoice-section-4">
                                <h3>Date Issued:</h3>
                                <p>{new Date(invoiceData.date).toLocaleDateString()}</p>
                            </div>
                            <div className="invoice-section-5">
                                <h3>Due Date:</h3>
                                <p>{new Date(invoiceData.due_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <h3>Items:</h3>
                    <table className="invoice-items">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items ? safeJsonParse(invoiceData.items).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.description}</td>
                                    <td>{safeToFixed(item.rate)}</td>
                                    <td>{item.qty}</td>
                                    <td>{safeToFixed(item.rate * item.qty)}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4">No items found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="invoice-section-bottom">
                        <div className="invoice-section-6">
                            <h3>Notes:</h3>
                            <p>{invoiceData.note}</p>
                        </div>
                        <div className="invoice-totals">
                            <div className="invoice-sect-1">
                                <h3>Subtotal:</h3>
                                <h3 style={{marginLeft:'10px'}}>{safeToFixed(invoiceData.sub_total)}</h3>
                            </div>
                            <div className="invoice-sect-2">
                                <h3>Tax:</h3>
                                <h3 style={{marginLeft:'50px'}}>{invoiceData.tax}%</h3>
                            </div>
                            <div className="invoice-sect-3">
                                <h3>Discount:</h3>
                                <h3 style={{marginLeft:'10px'}}>{invoiceData.discount}%</h3>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-sect-4">
                        <h3>Total:</h3>
                        <h3 style={{marginLeft:'10px',color:'green'}}>{safeToFixed(invoiceData.total)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetInvoice;

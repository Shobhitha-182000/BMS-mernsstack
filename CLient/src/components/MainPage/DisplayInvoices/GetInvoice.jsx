import React, { useState } from 'react';
import axios from 'axios';
import './GetInvoice.css';
import { IoMdDownload } from "react-icons/io";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

 
const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
 
const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);  
};

const GetInvoice = () => {
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState(null);
    const Navigate=useNavigate()

    const clickHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/invoice/${invoiceNo}`);
            setInvoiceData(response.data.data);
            setError(null);
        } catch (error) {
            setError('Invoice not found or error fetching data.');
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

    const downloadImage = () => {
        const input = document.getElementById('invoice-to-print');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg');
            const imgBlob = dataURLtoBlob(imgData);
            saveAs(imgBlob, `${invoiceData.invoice_no}.jpg`);
        });
        // const userWantsToSeeImage = confirm('Downoload succesfully...Do you want to see the file?');
        // if(userWantsToSeeImage){
        //     Navigate('/view-pdf');
        //     const image=localStorage.setItem('pic',imgBlob)
        // }
        
        
        
    };

    const dataURLtoBlob = (dataURL) => {
        const [header, data] = dataURL.split(',');
        const mime = header.match(/:(.*?);/)[1];
        const binary = atob(data);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: mime });
    };

    return (
        <div className="getInvoice-container">
            <label>Enter Invoice Number</label>
            <input
                type='text'
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder='Enter an invoice number'
            />
            <button onClick={clickHandler}>Get</button>

            {error && <p className="error">{error}</p>}

            {invoiceData && (
                <div id="invoice-to-print" className="invoice-display">
                    <h2>Invoice Details
                        <div className="download">
                            <IoMdDownload
                                title='Download as JPG'
                                onClick={downloadImage}
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
                        <div className="invoice-details">
                            <div className="invoice-section-2">
                                <h3>Company:</h3>
                                <textarea className="invoice-textarea" readOnly>{invoiceData.company}</textarea>
                            </div>
                            <div className="invoice-section-3">
                                <h3>Bill To:</h3>
                                <textarea className="invoice-textarea" readOnly>{invoiceData.bill_to}</textarea>
                            </div>
                        </div>

                        <div className="invoice-section-third">
                            <div className="invoice-section-4">
                                <h3>Date Issued:</h3>
                                <p>{formatDate(parseDate(invoiceData.date))}</p>
                            </div>
                            <div className="invoice-section-5">
                                <h3>Due Date:</h3>
                                <p>{formatDate(new Date(invoiceData.due_date))}</p>
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
                    <div className="note">
                        <div className="note-heading">
                            Note: <h3>{invoiceData.Note}</h3>
                        </div>
                    </div>

                    <div className="invoice-section-bottom">
                        <div className="invoice-totals">
                            <div className="invoice-sect-1">
                                <h3>Subtotal:</h3>
                                <h3>{safeToFixed(invoiceData.sub_total)}</h3>
                            </div>
                            <div className="invoice-sect-2">
                                <h3>Tax:</h3>
                                <h3>{invoiceData.tax}%</h3>
                            </div>
                            <div className="invoice-sect-3">
                                <h3>Discount:</h3>
                                <h3>{invoiceData.discount}%</h3>
                            </div>
                        </div>
                        <div className="invoice-sect-4">
                            <h3>Total:</h3>
                            <h3 style={{ color: 'green' }}>{safeToFixed(invoiceData.total)}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetInvoice;

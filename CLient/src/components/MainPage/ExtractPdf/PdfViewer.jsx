import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PdfUpload.css';
import { IoMdDownload } from 'react-icons/io';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
    if (typeof dateString === 'string') {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    }
    return dateString;
};

const PdfViewer = ({ invNo }) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/invoice/${invNo}`);
                setInvoiceData(response.data.data);
                console.log(response.data);
                setError(null);
            } catch (error) {
                setError('Invoice not found or error fetching data.');
                setInvoiceData(null);
            }
        };

        if (invNo) {
            fetchInvoiceData();
        }
    }, [invNo]);

    const safeJsonParse = (data) => {
        if (Array.isArray(data)) {
            return data;
        }
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
        <div className="getInvoice-container1">
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
                                <p>{formatDate(parseDate(invoiceData.due_date))}</p>
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
                            {invoiceData.items && Array.isArray(invoiceData.items) ? (
                                invoiceData.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.description}</td>
                                        <td>{item.rate}</td>
                                        <td>{item.qty}</td>
                                        <td>{safeToFixed(item.rate * item.qty)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No items found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="note">
                        <div className="note-heading">
                            Note: <h3>{invoiceData.note}</h3>
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
                            {/* {invoiceData.total} */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfViewer;

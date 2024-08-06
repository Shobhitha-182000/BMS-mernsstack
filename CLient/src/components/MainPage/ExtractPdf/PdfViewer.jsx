// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './PdfUpload.css';
// // import { IoMdDownload } from 'react-icons/io';
// // import { saveAs } from 'file-saver';
// // import html2canvas from 'html2canvas';
// // import { CiShare2 } from "react-icons/ci";
// // import { ShareSocial } from 'react-share-social';

// // const formatDate = (date) => {
// //     if (!(date instanceof Date) || isNaN(date.getTime())) {
// //         return 'Invalid Date';
// //     }
// //     const day = ("0" + date.getDate()).slice(-2);
// //     const month = ("0" + (date.getMonth() + 1)).slice(-2);
// //     const year = date.getFullYear();
// //     return `${day}/${month}/${year}`;
// // };

// // const parseDate = (dateString) => {
// //     if (typeof dateString === 'string') {
// //         const date = new Date(dateString);
// //         return isNaN(date.getTime()) ? null : date;
// //     }
// //     return dateString;
// // };

// // const PdfViewer = ({ invNo }) => {
// //     const [invoiceData, setInvoiceData] = useState(null);
// //     const [error, setError] = useState(null);
// //     const [isSocial, setSocial] = useState(false);

// //     useEffect(() => {
// //         const fetchInvoiceData = async () => {
// //             try {
// //                 const response = await axios.get(`http://localhost:3000/user/invoice/${invNo}`);
// //                 setInvoiceData(response.data.data);
// //                 setError(null);
// //             } catch (error) {
// //                 setError('Invoice not found or error fetching data.');
// //                 setInvoiceData(null);
// //             }
// //         };

// //         if (invNo) {
// //             fetchInvoiceData();
// //         }
// //     }, [invNo]);

// //     const safeToFixed = (value, decimals = 2) => {
// //         if (typeof value === 'number') {
// //             return value.toFixed(decimals);
// //         }
// //         return '0.00';
// //     };

// //     const downloadImage = () => {
// //         const input = document.getElementById('invoice-to-print');
// //         html2canvas(input).then((canvas) => {
// //             const imgData = canvas.toDataURL('image/jpeg');
// //             const imgBlob = dataURLtoBlob(imgData);
// //             saveAs(imgBlob, `${invoiceData.invoice_no}.jpg`);
// //         });
// //     };

// //     const dataURLtoBlob = (dataURL) => {
// //         const [header, data] = dataURL.split(',');
// //         const mime = header.match(/:(.*?);/)[1];
// //         const binary = atob(data);
// //         const array = [];
// //         for (let i = 0; i < binary.length; i++) {
// //             array.push(binary.charCodeAt(i));
// //         }
// //         return new Blob([new Uint8Array(array)], { type: mime });
// //     };

// //     const shareInvoice = () => {
// //         setSocial(!isSocial);
    
// //         const input = document.getElementById('invoice-to-print');
// //         html2canvas(input).then(async (canvas) => {
// //             const imgData = canvas.toDataURL('image/jpeg');
// //             const imgBlob = dataURLtoBlob(imgData);
    
        
// //             const formData = new FormData();
// //             formData.append('file', imgBlob, `${invoiceData.invoice_no}.jpg`);
    
// //             try {
             
// //                 const response = await axios.post('http://localhost:3000/user/upload', formData, {
// //                     headers: {
// //                         'Content-Type': 'multipart/form-data',
// //                     },
// //                 });
    
             
// //                 const uploadedImageURL = response.data.imageURL;  
    
// //                  console.log('pdf',uploadedImageURL);
// //                 const updatedInvoiceURL = uploadedImageURL;
// //                 console.log('image',updatedInvoiceURL);
    
                 
// //                 setSocial(true);
                
// //             } catch (error) {
// //                 console.error('Error uploading image:', error);
// //             }
// //         });
// //     };
    

  
// //     const invoiceURL = `http://localhost:3000/user/invoice/${invNo}`;

// //     return (
// //         <div className="getInvoice-container1">
// //             {error && <p className="error">{error}</p>}
// //             {invoiceData && (
// //                 <div id="invoice-to-print" className="invoice-display">
// //                     <h2>
// //                         Invoice
// //                         <div className="download">
// //                             <div className="dwnld">
// //                                 <IoMdDownload
// //                                     title='Download as JPG'
// //                                     onClick={downloadImage}
// //                                     style={{ cursor: 'pointer' }}
// //                                 />
// //                             </div>
// //                             <div className="share">
// //                                 <CiShare2
// //                                     className='share'
// //                                     title='Share'
// //                                     onClick={shareInvoice}
// //                                     style={{ cursor: 'pointer' }}
// //                                 />
// //                             </div>
// //                         </div>
// //                         {isSocial && (
// //                             <div className='share-social'>
// //                                 <ShareSocial
// //                                     socialTypes={['whatsapp', 'facebook', 'email']}
// //                                     url={BMS-mernsstack/Backend/uploads/100 (6).jpg}
// //                                     subject={`Invoice ${invoiceData.invoice_no}`}
// //                                     body={`Please find the invoice here: ${invoiceURL}`}
// //                                 />
// //                             </div>
// //                         )}
// //                     </h2>

// //                     <div className="invoice-section-side">
// //                         <img src={`/files/${invoiceData.logo}`} alt='logo'/>
// //                         <div className="invoice-section-1">
// //                             <h3>Invoice No:</h3>
// //                             <h3>{invoiceData.invoice_no}</h3>
// //                         </div>
// //                     </div>

// //                     <div className="invoice-info">
// //                         <div className="invoice-details">
// //                             <div className="invoice-section-2">
// //                                 <h3>Company:</h3>
// //                                 <textarea className="invoice-textarea" readOnly>{invoiceData.company}</textarea>
// //                             </div>
// //                             <div className="invoice-section-3">
// //                                 <h3>Bill To:</h3>
// //                                 <textarea className="invoice-textarea" readOnly>{invoiceData.bill_to}</textarea>
// //                             </div>
// //                         </div>

// //                         <div className="invoice-section-third">
// //                             <div className="invoice-section-4">
// //                                 <h3>Date Issued:</h3>
// //                                 <p>{formatDate(parseDate(invoiceData.date))}</p>
// //                             </div>
// //                             <div className="invoice-section-5">
// //                                 <h3>Due Date:</h3>
// //                                 <p>{formatDate(parseDate(invoiceData.due_date))}</p>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <h3>Items:</h3>
// //                     <table className="invoice-items">
// //                         <thead>
// //                             <tr>
// //                                 <th>Description</th>
// //                                 <th>Rate</th>
// //                                 <th>Quantity</th>
// //                                 <th>Amount</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {invoiceData.items && Array.isArray(invoiceData.items) ? (
// //                                 invoiceData.items.map((item, index) => (
// //                                     <tr key={index}>
// //                                         <td>{item.description}</td>
// //                                         <td>{item.rate}</td>
// //                                         <td>{item.qty}</td>
// //                                         <td>{safeToFixed(item.rate * item.qty)}</td>
// //                                     </tr>
// //                                 ))
// //                             ) : (
// //                                 <tr>
// //                                     <td colSpan="4">No items found</td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </table>
// //                     <div className="note">
// //                         <div className="note-heading">
// //                             Note: <h3>{invoiceData.note}</h3>
// //                         </div>
// //                     </div>

// //                     <div className="invoice-section-bottom">
// //                         <div className="invoice-totals">
// //                             <div className="invoice-sect-1">
// //                                 <h3>Subtotal:</h3>
// //                                 <h3>{safeToFixed(invoiceData.sub_total)}</h3>
// //                             </div>
// //                             <div className="invoice-sect-2">
// //                                 <h3>Tax:</h3>
// //                                 <h3>{invoiceData.tax}%</h3>
// //                             </div>
// //                             <div className="invoice-sect-3">
// //                                 <h3>Discount:</h3>
// //                                 <h3>{invoiceData.discount}%</h3>
// //                             </div>
// //                         </div>
// //                         <div className="invoice-sect-4">
// //                             <h3>Total:</h3>
// //                             <h3 style={{ color: 'green' }}>{safeToFixed(invoiceData.total)}</h3>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default PdfViewer;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IoMdDownload } from 'react-icons/io';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import { CiShare2 } from 'react-icons/ci';

// const PdfViewer = ({ invNo }) => {
//     const [invoiceData, setInvoiceData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchInvoiceData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/user/invoice/${invNo}`);
//                 setInvoiceData(response.data.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Invoice not found or error fetching data.');
//                 setInvoiceData(null);
//             }
//         };

//         if (invNo) {
//             fetchInvoiceData();
//         }
//     }, [invNo]);

//     const formatDate = (date) => {
//         if (!(date instanceof Date) || isNaN(date.getTime())) {
//             return 'Invalid Date';
//         }
//         const day = ("0" + date.getDate()).slice(-2);
//         const month = ("0" + (date.getMonth() + 1)).slice(-2);
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     };

//     const parseDate = (dateString) => {
//         if (typeof dateString === 'string') {
//             const date = new Date(dateString);
//             return isNaN(date.getTime()) ? null : date;
//         }
//         return dateString;
//     };

//     const safeToFixed = (value, decimals = 2) => {
//         if (typeof value === 'number') {
//             return value.toFixed(decimals);
//         }
//         return '0.00';
//     };

//     const downloadImage = () => {
//         const input = document.getElementById('invoice-to-print');
//         html2canvas(input).then((canvas) => {
//             const imgData = canvas.toDataURL('image/jpeg');
//             const imgBlob = dataURLtoBlob(imgData);
//             saveAs(imgBlob, `${invoiceData.invoice_no}.jpg`);
//         });
//     };

//     const dataURLtoBlob = (dataURL) => {
//         const [header, data] = dataURL.split(',');
//         const mime = header.match(/:(.*?);/)[1];
//         const binary = atob(data);
//         const array = [];
//         for (let i = 0; i < binary.length; i++) {
//             array.push(binary.charCodeAt(i));
//         }
//         return new Blob([new Uint8Array(array)], { type: mime });
//     };

//     const emailInvoice = () => {
//         const input = document.getElementById('invoice-to-print');
//         html2canvas(input).then(async (canvas) => {
//             const imgData = canvas.toDataURL('image/jpeg');
//             const imgBlob = dataURLtoBlob(imgData);

//             const formData = new FormData();
//             formData.append('file', imgBlob, `${invoiceData.invoice_no}.jpg`);

//             try {
//                 await axios.post('http://localhost:3000/user/upload', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });
//                 alert('Email sent successfully.');
//             } catch (error) {
//                 console.error('Error sending email:', error);
//             }
//         });
//     };

//     return (
//         <div className="getInvoice-container1">
//             {error && <p className="error">{error}</p>}
//             {invoiceData && (
//                 <div id="invoice-to-print" className="invoice-display">
//                     <h2>
//                         Invoice
//                         <div className="download">
//                             <div className="dwnld">
//                                 <IoMdDownload
//                                     title='Download as JPG'
//                                     onClick={downloadImage}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                             </div>
//                             <div className="share">
//                                 <CiShare2
//                                     className='share'
//                                     title='Send via Email'
//                                     onClick={emailInvoice}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                             </div>
//                         </div>
//                     </h2>

//                     <div className="invoice-section-side">
//                         <img src={`/files/${invoiceData.logo}`} alt='logo'/>
//                         <div className="invoice-section-1">
//                             <h3>Invoice No:</h3>
//                             <h3>{invoiceData.invoice_no}</h3>
//                         </div>
//                     </div>

//                     <div className="invoice-info">
//                         <div className="invoice-details">
//                             <div className="invoice-section-2">
//                                 <h3>Company:</h3>
//                                 <textarea className="invoice-textarea" readOnly>{invoiceData.company}</textarea>
//                             </div>
//                             <div className="invoice-section-3">
//                                 <h3>Bill To:</h3>
//                                 <textarea className="invoice-textarea" readOnly>{invoiceData.bill_to}</textarea>
//                             </div>
//                         </div>

//                         <div className="invoice-section-third">
//                             <div className="invoice-section-4">
//                                 <h3>Date Issued:</h3>
//                                 <p>{formatDate(parseDate(invoiceData.date))}</p>
//                             </div>
//                             <div className="invoice-section-5">
//                                 <h3>Due Date:</h3>
//                                 <p>{formatDate(parseDate(invoiceData.due_date))}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <h3>Items:</h3>
//                     <table className="invoice-items">
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Rate</th>
//                                 <th>Quantity</th>
//                                 <th>Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {invoiceData.items && Array.isArray(invoiceData.items) ? (
//                                 invoiceData.items.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.description}</td>
//                                         <td>{item.rate}</td>
//                                         <td>{item.qty}</td>
//                                         <td>{safeToFixed(item.rate * item.qty)}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4">No items found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                     <div className="note">
//                         <div className="note-heading">
//                             Note: <h3>{invoiceData.note}</h3>
//                         </div>
//                     </div>

//                     <div className="invoice-section-bottom">
//                         <div className="invoice-totals">
//                             <div className="invoice-sect-1">
//                                 <h3>Subtotal:</h3>
//                                 <h3>{safeToFixed(invoiceData.sub_total)}</h3>
//                             </div>
//                             <div className="invoice-sect-2">
//                                 <h3>Tax:</h3>
//                                 <h3>{invoiceData.tax}%</h3>
//                             </div>
//                             <div className="invoice-sect-3">
//                                 <h3>Discount:</h3>
//                                 <h3>{invoiceData.discount}%</h3>
//                             </div>
//                         </div>
//                         <div className="invoice-sect-4">
//                             <h3>Total:</h3>
//                             <h3 style={{ color: 'green' }}>{safeToFixed(invoiceData.total)}</h3>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PdfViewer;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IoMdDownload } from 'react-icons/io';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import { CiShare2 } from 'react-icons/ci';
// import imageManually from './image.jpg'

// const PdfViewer = ({ invNo }) => {
//     const [invoiceData, setInvoiceData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchInvoiceData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/user/invoice/${invNo}`);
//                 setInvoiceData(response.data.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Invoice not found or error fetching data.');
//                 setInvoiceData(null);
//             }
//         };

//         if (invNo) {
//             fetchInvoiceData();
//         }
//     }, [invNo]);

//     const formatDate = (date) => {
//         if (!(date instanceof Date) || isNaN(date.getTime())) {
//             return 'Invalid Date';
//         }
//         const day = ("0" + date.getDate()).slice(-2);
//         const month = ("0" + (date.getMonth() + 1)).slice(-2);
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     };

//     const parseDate = (dateString) => {
//         if (typeof dateString === 'string') {
//             const date = new Date(dateString);
//             return isNaN(date.getTime()) ? null : date;
//         }
//         return dateString;
//     };

//     const safeToFixed = (value, decimals = 2) => {
//         if (typeof value === 'number') {
//             return value.toFixed(decimals);
//         }
//         return '0.00';
//     };

//     const downloadImage = () => {
//         const input = document.getElementById('invoice-to-print');
//         html2canvas(input).then((canvas) => {
//             const imgData = canvas.toDataURL('image/jpeg');
//             const imgBlob = dataURLtoBlob(imgData);
//             saveAs(imgBlob, `${invoiceData.invoice_no}.jpg`);
//         });
//     };

//     const dataURLtoBlob = (dataURL) => {
//         const [header, data] = dataURL.split(',');
//         const mime = header.match(/:(.*?);/)[1];
//         const binary = atob(data);
//         const array = [];
//         for (let i = 0; i < binary.length; i++) {
//             array.push(binary.charCodeAt(i));
//         }
//         return new Blob([new Uint8Array(array)], { type: mime });
//     };
//     const saveAndSend=()=>{

//     }

//     // const emailInvoice = async () => {
//     //     const input = document.getElementById('invoice-to-print');
//     //     html2canvas(input).then(async (canvas) => {
//     //         const imgData = canvas.toDataURL('image/jpeg');
//     //         const imgBlob = dataURLtoBlob(imgData);
    
//     //         const formData = new FormData();
//     //         formData.append('file', imgBlob, `${invoiceData.invoice_no}.jpg`);
    
//     //         try {
//     //             // Upload image and get URL
//     //             const response = await axios.post('http://localhost:3000/user/upload', formData, {
//     //                 headers: {
//     //                     'Content-Type': 'multipart/form-data',
//     //                 },
//     //             });
//     //             const { imageURL } = response.data;
    
//     //             // Prepare email
//     //             const subject = `Invoice ${invoiceData.invoice_no}`;
//     //             const body = `Please find the invoice attached. You can view or download the invoice from the following link: ${imageManually}`;
    
              
//     //             const mailtoLink = `mailto:shobhithaas07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
               
//     //             window.location.href = mailtoLink;
    
//     //         } catch (error) {
//     //             console.error('Error sending email:', error);
//     //         }
//     //     });
//     // };
    

//     return (
//         <div className="getInvoice-container1">
//             {error && <p className="error">{error}</p>}
//             {invoiceData && (
//                 <div id="invoice-to-print" className="invoice-display">
//                     <h2>
//                         Invoice Details
                       
                        
//                     </h2>

//                     <div className="invoice-section-side">
//                         <img src={`/files/${invoiceData.logo}`} alt='logo'/>
//                         <div className="invoice-section-1">
//                             <h3>Invoice No:</h3>
//                             <h3>{invoiceData.invoice_no}</h3>
//                         </div>
//                     </div>

//                     <div className="invoice-info">
//                         <div className="invoice-details">
//                             <div className="invoice-section-2">
//                                 <h3>Company:</h3>
//                                 <textarea className="invoice-textarea" readOnly>{invoiceData.company}</textarea>
//                             </div>
//                             <div className="invoice-section-3">
//                                 <h3>Bill To:</h3>
//                                 <textarea className="invoice-textarea" readOnly>{invoiceData.bill_to}</textarea>
//                             </div>
//                         </div>

//                         <div className="invoice-section-third">
//                             <div className="invoice-section-4">
//                                 <h3>Date Issued:</h3>
//                                 <p>{formatDate(parseDate(invoiceData.date))}</p>
//                             </div>
//                             <div className="invoice-section-5">
//                                 <h3>Due Date:</h3>
//                                 <p>{formatDate(parseDate(invoiceData.due_date))}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <h3>Items:</h3>
//                     <table className="invoice-items">
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Rate</th>
//                                 <th>Quantity</th>
//                                 <th>Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {invoiceData.items && Array.isArray(invoiceData.items) ? (
//                                 invoiceData.items.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.description}</td>
//                                         <td>{item.rate}</td>
//                                         <td>{item.qty}</td>
//                                         <td>{safeToFixed(item.rate * item.qty)}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4">No items found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                     <div className="note">
//                         <div className="note-heading">
//                             Note: <h3>{invoiceData.note}</h3>
//                         </div>
//                     </div>

//                     <div className="invoice-section-bottom">
//                         <div className="invoice-totals">
//                             <div className="invoice-sect-1">
//                                 <h3>Subtotal:</h3>
//                                 <h3>{safeToFixed(invoiceData.sub_total)}</h3>
//                             </div>
//                             <div className="invoice-sect-2">
//                                 <h3>Tax:</h3>
//                                 <h3>{invoiceData.tax}%</h3>
//                             </div>
//                             <div className="invoice-sect-3">
//                                 <h3>Discount:</h3>
//                                 <h3>{invoiceData.discount}%</h3>
//                             </div>
//                         </div>
//                         <div className="invoice-sect-4">
//                             <h3>Total:</h3>
//                             <h3 style={{ color: 'green' }}>{safeToFixed(invoiceData.total)}</h3>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className='saveAndsend' onClick={saveAndSend}>
//                     Save and Send
//             </div>

//         </div>
//     );
// };

// export default PdfViewer;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IoMdDownload } from 'react-icons/io';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import { CiShare2 } from 'react-icons/ci';
// import imageManually from './image.jpg'; // Update this path as necessary

// const PdfViewer = ({ invNo }) => {
//     const [invoiceData, setInvoiceData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchInvoiceData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/user/invoice/${invNo}`);
//                 setInvoiceData(response.data.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Invoice not found or error fetching data.');
//                 setInvoiceData(null);
//             }
//         };

//         if (invNo) {
//             fetchInvoiceData();
//         }
//     }, [invNo]);

//     const formatDate = (date) => {
//         if (!(date instanceof Date) || isNaN(date.getTime())) {
//             return 'Invalid Date';
//         }
//         const day = ("0" + date.getDate()).slice(-2);
//         const month = ("0" + (date.getMonth() + 1)).slice(-2);
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     };

//     const parseDate = (dateString) => {
//         if (typeof dateString === 'string') {
//             const date = new Date(dateString);
//             return isNaN(date.getTime()) ? null : date;
//         }
//         return dateString;
//     };

//     const safeToFixed = (value, decimals = 2) => {
//         if (typeof value === 'number') {
//             return value.toFixed(decimals);
//         }
//         return '0.00';
//     };

//     const downloadImage = () => {
//         const input = document.getElementById('invoice-to-print');
//         html2canvas(input).then((canvas) => {
//             const imgData = canvas.toDataURL('image/jpeg');
//             const imgBlob = dataURLtoBlob(imgData);
//             saveAs(imgBlob, `${invoiceData.invoice_no}.jpg`);
//         });
//     };

//     const dataURLtoBlob = (dataURL) => {
//         const [header, data] = dataURL.split(',');
//         const mime = header.match(/:(.*?);/)[1];
//         const binary = atob(data);
//         const array = [];
//         for (let i = 0; i < binary.length; i++) {
//             array.push(binary.charCodeAt(i));
//         }
//         return new Blob([new Uint8Array(array)], { type: mime });
//     };

//     const saveAndSend = async () => {
//         const input = document.getElementById('invoice-to-print');
//         html2canvas(input).then(async (canvas) => {
//             const imgData = canvas.toDataURL('image/jpeg');
//             const imgBlob = dataURLtoBlob(imgData);

//             const formData = new FormData();
//             formData.append('file', imgBlob, `${invoiceData.invoice_no}.jpg`);

//             try {
//                 // Upload image and get URL
//                 const response = await axios.post('http://localhost:3000/user/upload', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });
//                 const { imageURL } = response.data;

//                 // Prepare email
//                 const subject = `Invoice ${invoiceData.invoice_no}`;
//                 const body = `Please find the invoice attached. You can view or download the invoice from the following link: ${imageURL}`;
                
//                 // Create a mailto link
//                 const mailtoLink = `mailto:shobhithaas07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//                 // Open mail client
//                 window.location.href = mailtoLink;

//             } catch (error) {
//                 console.error('Error saving and sending email:', error);
//             }
//         });
//     };

//     return (
//         <div className="getInvoice-container1">
//             {error && <p className="error">{error}</p>}
//             {invoiceData && (
//                 <div id="invoice-to-print" className="invoice-display">
//                     <h2>
//                         Invoice Details
//                         <div className="download">
//                             <div className="dwnld">
//                                 <IoMdDownload
//                                     title='Download as JPG'
//                                     onClick={downloadImage}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                             </div>
//                             <div className="share">
//                                 <CiShare2
//                                     className='share'
//                                     title='Send via Email'
//                                     onClick={saveAndSend}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                             </div>
//                         </div>
//                     </h2>

//                     <div className="invoice-section-side">
//                         <img src={`/files/${invoiceData.logo}`} alt='logo'/>
//                         <div className="invoice-section-1">
//                             <h3>Invoice No:</h3>
//                             <h3>{invoiceData.invoice_no}</h3>
//                         </div>
//                     </div>

//                     <div className="invoice-info">
//                         <div className="invoice-details">
//                             <div className="invoice-section-2">
//                                 <h3>Company:</h3>
//                                 <textarea className="invoice-textarea" readOnly>{invoiceData.company}</textarea>
//                             </div>
//                             <div className="invoice-section-3">
//                                 <h3>Bill To:</h3>
//                                 <textarea className="invoice-textarea" readOnly>{invoiceData.bill_to}</textarea>
//                             </div>
//                         </div>

//                         <div className="invoice-section-third">
//                             <div className="invoice-section-4">
//                                 <h3>Date Issued:</h3>
//                                 <p>{formatDate(parseDate(invoiceData.date))}</p>
//                             </div>
//                             <div className="invoice-section-5">
//                                 <h3>Due Date:</h3>
//                                 <p>{formatDate(parseDate(invoiceData.due_date))}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <h3>Items:</h3>
//                     <table className="invoice-items">
//                         <thead>
//                             <tr>
//                                 <th>Description</th>
//                                 <th>Rate</th>
//                                 <th>Quantity</th>
//                                 <th>Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {invoiceData.items && Array.isArray(invoiceData.items) ? (
//                                 invoiceData.items.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.description}</td>
//                                         <td>{item.rate}</td>
//                                         <td>{item.qty}</td>
//                                         <td>{safeToFixed(item.rate * item.qty)}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4">No items found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                     <div className="note">
//                         <div className="note-heading">
//                             Note: <h3>{invoiceData.note}</h3>
//                         </div>
//                     </div>

//                     <div className="invoice-section-bottom">
//                         <div className="invoice-totals">
//                             <div className="invoice-sect-1">
//                                 <h3>Subtotal:</h3>
//                                 <h3>{safeToFixed(invoiceData.sub_total)}</h3>
//                             </div>
//                             <div className="invoice-sect-2">
//                                 <h3>Tax:</h3>
//                                 <h3>{invoiceData.tax}%</h3>
//                             </div>
//                             <div className="invoice-sect-3">
//                                 <h3>Discount:</h3>
//                                 <h3>{invoiceData.discount}%</h3>
//                             </div>
//                         </div>
//                         <div className="invoice-sect-4">
//                             <h3>Total:</h3>
//                             <h3 style={{ color: 'green' }}>{safeToFixed(invoiceData.total)}</h3>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className='saveAndsend' onClick={saveAndSend}>
//                 Save and Send
//             </div>
//         </div>
//     );
// };

// export default PdfViewer;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdDownload } from 'react-icons/io';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import './PdfUpload.css';

const PdfViewer = ({ invNo }) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/invoice/${invNo}`);
                setInvoiceData(response.data.data);
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

    const saveAndSend = async () => {
        const input = document.getElementById('invoice-to-print');
        html2canvas(input).then(async (canvas) => {
            const imgData = canvas.toDataURL('image/jpeg');
            const imgBlob = dataURLtoBlob(imgData);

            const formData = new FormData();
            formData.append('file', imgBlob, `${invoiceData.invoice_no}.jpg`);
            formData.append('to', email);

            setSending(true);

            try {
                await axios.post('http://localhost:3000/user/api/send-email', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Email sent successfully.');
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Error sending email.');
            } finally {
                setSending(false);
            }
        });
    };

    return (
        <div className="getInvoice-container1">
            {error && <p className="error">{error}</p>}
            {invoiceData && (
                <div id="invoice-to-print" className="invoice-display">
                    <h2>Invoice Details</h2>
                    <div className="invoice-section-side">
                        <img src={`/files/${invoiceData.logo}`} alt='logo'/>
                        <div className="invoice-section-1">
                            <h3>Invoice No:</h3>
                            <h3 className='inv_no1'>{invoiceData.invoice_no}</h3>
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
                        <div className="invoice-sect-4"  >
                            <h3 >Total:</h3>
                            <h3 >{safeToFixed(invoiceData.total)}</h3>
                        </div>
                    </div>
                </div>
                
            )}
             <div className="email-section">
                <input 
                    type="email" 
                    placeholder="Recipient Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={saveAndSend} disabled={sending}>
                    {sending ? 'Sending...' : 'Save and Send'}
                </button>
            </div>
        </div>
    );
};

export default PdfViewer;

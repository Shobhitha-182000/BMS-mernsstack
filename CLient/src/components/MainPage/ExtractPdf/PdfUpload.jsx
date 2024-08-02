import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UploadImage.css';
import PdfViewer from './PdfViewer';
import { MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

const PdfUpload = () => {
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState(null);
    const [isEditOpen, setEditOpen] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        invoice_no: '',
        company: '',
        bill_to: '',
        date: '',
        due_date: '',
        items: [],
        note: ''
    });
    const [invNo, setInvNo] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0); 

    useEffect(() => {
        if (!image) return;

        const extractText = async () => {
            const data = new FormData();
            data.append('image', image);

            try {
                const result = await axios.post('http://localhost:3000/txt/extract-text-from-image', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const invoiceNo = result.data.invoice_no;
                setInvNo(invoiceNo);
                getInvoiceData(invoiceNo);
                setError(null);
                setPdfReady(false);  
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('Error extracting data from image.');
            }
        };

        extractText();
    }, [image]);

    const getInvoiceData = async (invoiceNo) => {
        try {
            const result = await axios.get(`http://localhost:3000/user/invoice/${invoiceNo}`);
            setFormData(prevData => ({
                ...prevData,
                ...result.data.data,
                items: Array.isArray(result.data.data.items) ? result.data.data.items : []
            }));
            setResponse(result.data.data);
            setError(null);
            updateCalculations();
            setRefreshKey(prevKey => prevKey + 1); // Trigger refresh of PdfViewer
        } catch (error) {
            console.error('Error fetching invoice data:', error);
            setError('Error fetching invoice data. Please upload a valid image.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }), updateCalculations);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        setFormData(prevData => ({
            ...prevData,
            items: newItems
        }), updateCalculations);
    };

    const addItem = () => {
        setFormData(prevData => ({
            ...prevData,
            items: [...prevData.items, { description: '', rate: '', qty: '', amount: 0 }]
        }), updateCalculations);
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            items: newItems
        }), updateCalculations);
    };

    const calculateSubtotal = () => {
        const subtotalAmount = formData.items.reduce((acc, item) => acc + (parseFloat(item.qty) * parseFloat(item.rate) || 0), 0);
        setSubTotal(subtotalAmount);
        return subtotalAmount;
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = subtotal * (parseFloat(discount) / 100 || 0);
        const taxAmount = (subtotal - discountAmount) * (parseFloat(tax) / 100 || 0);
        const totalAmount = subtotal - discountAmount + taxAmount;
        setTotal(totalAmount);
        return totalAmount;
    };

    const updateCalculations = () => {
        calculateSubtotal();
        calculateTotal();
    };

    const editHandler = async () => {
        if (!invNo) return;

        updateCalculations();

        const formDataToSend = {
            ...formData,
            sub_total: subTotal.toFixed(2),
            tax,
            discount,
            total: total.toFixed(2)
        };

        try {
            await axios.put(`http://localhost:3000/user/invoice/${invNo}`, formDataToSend);
            alert('Invoice updated successfully!');
            getInvoiceData(invNo); 
        } catch (error) {
            console.error('Error updating invoice:', error);
            alert('Error updating invoice.');
        }
    };

    return (
        <div className={`invoice_container-1 ${isEditOpen ? 'edit-mode' : ''}`}>
            <div className="top-nav-bar">
                <h2>Upload Invoice for Extraction</h2>
                <div className="top-nav-buttons">
                    <label className="upload-button">
                        Upload Image
                        <input
                            type="file"
                            accept="image/jpeg"
                            onChange={handleImageChange}
                        />
                    </label>
                    {invNo && (
                        <button className="edit-button" onClick={() => setEditOpen(!isEditOpen)}>
                            {isEditOpen ? 'Close Edit' : 'Edit'}
                        </button>
                    )}
                </div>
            </div>

            <div className="content-container">
                {invNo ? (
                    <div className="pdf-viewer-container">
                        <PdfViewer key={refreshKey} invNo={invNo} />
                    </div>
                ) : (
                    <div className="no-pdf">
                        {error && <p className="error-message">{error}</p>}
                        <p>Upload an image to extract data and view the PDF.</p>
                    </div>
                )}

                {isEditOpen && response && (
                    <div className="extracted-data-container">
                        <div className="first_container">
                            <div className="invoice_no">
                                <p><strong>Invoice No:</strong> {response.invoice_no}</p>
                            </div>
                        </div>
                        <div className="second-container">
                            <div className="company_details">
                                <p><strong>Company:</strong></p>
                                <input type="text" name="company" value={formData.company || ''} onChange={handleChange} />
                            </div>
                            <div className="bill_to">
                                <p><strong>Bill To:</strong></p>
                                <input type="text" name="bill_to" value={formData.bill_to || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="third-container">
                            <div className="date-issued">
                                <p><strong>Date:</strong></p>
                                <input type="date" name="date" value={formData.date || ''} onChange={handleChange} />
                            </div>
                            <div className="due_date">
                                <p><strong>Due Date:</strong></p>
                                <input type="date" name="due_date" value={formData.due_date || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="item-container">
                            <h3>Items:</h3>
                            <div className="table-end"><IoMdAdd onClick={addItem} /></div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Rate</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.items.length > 0 ? formData.items.map((item, index) => (
                                        <tr key={index}>
                                            <td><input type="text" value={item.description || ''} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
                                            <td><input type="number" value={item.rate || ''} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} /></td>
                                            <td><input type="number" value={item.qty || ''} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} /></td>
                                            <td>{(parseFloat(item.rate || 0) * parseFloat(item.qty || 0)).toFixed(2)}</td>
                                            <td><MdOutlineRemoveCircleOutline onClick={() => removeItem(index)} /></td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5">No items added</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="invoice-summary">
                            <p><strong>Subtotal:</strong> {subTotal.toFixed(2)}</p>
                            <p><strong>Tax (%):</strong></p>
                            <input type="number" value={tax || ''} onChange={(e) => setTax(e.target.value)} />
                            <p><strong>Discount (%):</strong></p>
                            <input type="number" value={discount || ''} onChange={(e) => setDiscount(e.target.value)} />
                            <p><strong>Total:</strong> {total.toFixed(2)}</p>
                        </div>
                        <div className="note-container">
                            <p><strong>Note:</strong></p>
                            <textarea name="note" value={formData.note || ''} onChange={handleChange} />
                        </div>
                        <div className="last-btn">
                            <button onClick={editHandler} className="save-button">Update</button>
                            <button onClick={() => setEditOpen(false)} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfUpload;



// <div className="invoice-summary">
// <p><strong>Subtotal:</strong> {subTotal.toFixed(2)}</p>
// <p><strong>Tax (%):</strong></p>
// <input type="number" value={tax || ''} onChange={(e) => setTax(e.target.value)} />
// <p><strong>Discount (%):</strong></p>
// <input type="number" value={discount || ''} onChange={(e) => setDiscount(e.target.value)} />
// <p><strong>Total:</strong> {total.toFixed(2)}</p>
// </div>
// <div className="note-container">
// <p><strong>Note:</strong></p>
// <textarea name="note" value={formData.note || ''} onChange={handleChange} />
// </div>
// <div className="last-btn">
// <button onClick={editHandler} className="save-button">Update</button>
// <button onClick={() => setEditOpen(false)} className="cancel-button">Cancel</button>
// </div>
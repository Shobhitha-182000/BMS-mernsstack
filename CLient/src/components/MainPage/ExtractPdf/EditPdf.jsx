import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UploadImage.css';

const PdfUpload = () => {
    const [image, setImage] = useState(null);
    const [isEdit, setEdit] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [formData, setFormData] = useState({
        invoice_no: '',
        company: '',
        bill_to: '',
        date: '',
        due_date: '',
        items: [],
        sub_total: '',
        tax: '',
        discount: '',
        total: '',
        note: ''
    });
    const [error, setError] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreviewUrl(URL.createObjectURL(file)); 
            setEdit(true);
        }
    };

    useEffect(() => {
        const extractText = async () => {
            if (!image) return;

            const data = new FormData();
            data.append('image', image);

            try {
                const response = await axios.post('http://localhost:3000/txt/extract-text-from-image', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setFormData(response.data);
                setError(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('Error extracting data from image.');
            }
        };

        extractText();
    }, [image]);

    const editInvoice = () => {
        setEditOpen(true);
    };

    return (
        <div className="invoice_container">
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
                    {isEdit && <button className="edit-button" onClick={editInvoice}>Edit</button>}
                </div>
            </div>
            <div className={`content-container ${isEdit ? 'edit-mode' : ''}`}>
                <div className="image-preview-container">
                    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Image Preview" className={`image-preview ${isEdit ? 'larger-image' : ''}`} />}
                </div>
                {isEditOpen && (
                    <div className="extracted-data-container">
                        {error && <p className="error-message">{error}</p>}
                        {formData.invoice_no && (
                            <>
                                <div className="first_container">
                                    <div className="invoice_no">
                                        <p><strong>Invoice No:</strong></p>
                                        <input type="text" value={formData.invoice_no} readOnly />
                                    </div>
                                </div>
                                <div className="second-container">
                                    <div className="company_details">
                                        <p><strong>Company:</strong></p>
                                        <input type="text" value={formData.company} readOnly />
                                    </div>
                                    <div className="bill_to">
                                        <p><strong>Bill To:</strong></p>
                                        <input type="text" value={formData.bill_to} readOnly />
                                    </div>
                                </div>
                                <div className="third-container">
                                    <div className="date-issued">
                                        <p><strong>Date:</strong></p>
                                        <input type="text" value={formData.date} readOnly />
                                    </div>
                                    <div className="due_date">
                                        <p><strong>Due Date:</strong></p>
                                        <input type="text" value={formData.due_date} readOnly />
                                    </div>
                                </div>
                                <div className="item-container">
                                    <h3>Items:</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Rate</th>
                                                <th>Qty</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.items.length > 0 ? formData.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.description}</td>
                                                    <td>{item.rate}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.amount}</td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan="4">No items found</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="last-container">
                                    <div className="notes">
                                        <p><strong>Note:</strong></p>
                                        <textarea value={formData.note} readOnly />
                                    </div>
                                    <div className="total">
                                        <div><strong>Subtotal:</strong> {formData.sub_total}</div>
                                        <div><strong>Tax:</strong> {formData.tax}</div>
                                        <div><strong>Discount:</strong> {formData.discount}</div>
                                        <div><strong>Total:</strong> {formData.total}</div>
                                    </div>
                                </div>
                                <div className="savedetails">
                                    <button>Save Details</button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfUpload;

import React, { useEffect, useRef, useState } from 'react';
import './GenerateInvoice.css';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

const GenerateInvoice = () => {
    const dateIssuedRef = useRef(null);
    const dueDateRef = useRef(null);

    const [logo, setLogo] = useState();
    const [invoiceNo, setInvoiceNo] = useState('');
    const [company, setCompany] = useState('');
    const [billTo, setBillTo] = useState('');
    const [date, setDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [items, setItems] = useState([{ description: '', qty: '', rate: '' }]);
    const [tax, setTax] = useState('');
    const [discount, setDiscount] = useState('');
    const [note, setNote] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (dateIssuedRef.current) {
            dateIssuedRef.current.value = today;
        }
        if (dueDateRef.current) {
            dueDateRef.current.value = today;
        }
    }, []);

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { description: '', qty: '', rate: '' }]);
    };

    const calculateSubtotal = () => {
        return items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = subtotal * (discount / 100);
        const taxAmount = (subtotal - discountAmount) * (tax / 100);
        return subtotal - discountAmount + taxAmount;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('invoice_no', invoiceNo);
        formData.append('company', company);
        formData.append('bill_to', billTo);
        formData.append('date', date);
        formData.append('due_date', dueDate);
        formData.append('items', JSON.stringify(items));
        formData.append('tax', tax);
        formData.append('discount', discount);
        formData.append('note', note);

        try {
            const response = await axios.post('http://localhost:3000/user/invoice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Invoice created:', response.data.data.logo);
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    return (
        <div className="invoice_container">
            <form className="form" onSubmit={submitHandler}>
                <div className="first_container">
                    <div className="company-logo">
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="fileInput"
                            onChange={handleLogoChange}
                        />
                        <label htmlFor="fileInput" className="file-upload-label">
                            <FaCloudUploadAlt />
                            Upload Logo
                        </label>
                    </div>
                    <div className="invoice_no">Invoice No
                        <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                    </div>
                </div>
                <div className="second-container" style={{ display: 'flex' }}>
                    <div className="company_details" style={{ width: '400px' }}>Your company details
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className="bill_to" style={{ width: '400px' }}>Bill to
                        <input type="text" value={billTo} onChange={(e) => setBillTo(e.target.value)} />
                    </div>
                </div>
                <div className="third-container">
                    <div className="date-issued">Date issued
                        <input type="date" ref={dateIssuedRef} value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="due_date">Due date
                        <input type="date" ref={dueDateRef} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                </div>
                <div className="item-container">
                    <div className="table-end" onClick={addItem}><IoMdAdd /></div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Rate</th>
                                <th>Qty</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td><input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
                                    <td><input type="text" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} /></td>
                                    <td><input type="text" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} /></td>
                                    <td>{item.rate * item.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="last-container">
                    <div className="notes">Notes
                        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <div className="total">
                        <div className="subtotal">Subtotal
                            <span style={{ marginLeft: '20px', backgroundColor: 'white' }}><b>{calculateSubtotal()}</b></span>
                        </div>
                        <div className="tax">Tax (%)
                            <input type="number" style={{ marginLeft: '60px' }} value={tax} onChange={(e) => setTax(e.target.value)} />
                        </div>
                        <div className="discount">Discount (%)
                            <input type="number" style={{ marginLeft: '28px' }} value={discount} onChange={(e) => setDiscount(e.target.value)} />
                        </div>
                        <div className="grandtotal">Grand Total
                            <span style={{ marginLeft: '20px', backgroundColor: 'white', color:'green'  }}><b>{calculateTotal()}</b></span>
                        </div>
                    </div>
                </div>
                <div className="savedetails"><button type="submit">Save</button></div>
            </form>
        </div>
    );
};

export default GenerateInvoice;

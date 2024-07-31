const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Tesseract = require('tesseract.js');

const router = express.Router();

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post('/extract-text-from-image', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

        
        const extractedData = {
            invoice_no: extractField(text, 'Invoice No'),
            company: extractField(text, 'Company'),
            bill_to: extractField(text, 'Bill To'),
            date: extractField(text, 'Date'),
            due_date: extractField(text, 'Due Date'),
            items: extractItems(text),
            sub_total: extractField(text, 'Subtotal'),
            tax: extractField(text, 'Tax'),
            discount: extractField(text, 'Discount'),
            total: extractField(text, 'Total'),
            note: extractField(text, 'Note')
        };
        console.log(extractField.items)

        res.json(extractedData);
    } catch (error) {
        console.error('Error extracting text from image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const extractField = (text, fieldName) => {
    const regex = new RegExp(`${fieldName}:\\s*(.+?)\\s*(?=\\n|$)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
};

const extractItems = (text) => {
    const items = [];
    const itemRegex = /Item:\s*(.+?)\s*Rate:\s*(.+?)\s*Qty:\s*(.+?)\s*Amount:\s*(.+?)\s*(?=\n|$)/g;
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
        items.push({
            description: match[1].trim(),
            rate: match[2].trim(),
            qty: match[3].trim(),
            amount: match[4].trim()
        });
    }
    return items;
};

module.exports = router;

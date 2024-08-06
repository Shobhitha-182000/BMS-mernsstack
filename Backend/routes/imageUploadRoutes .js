const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const InvoiceFile = require('../models/InvoiceFile');  


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shobhithaas07@gmail.com',
        pass: 'fastslocsugvwnen',
    },
});

router.post('/api/send-email', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const imagePath = path.join(uploadDir, req.file.filename);

    console.log('File path:', imagePath);

    fs.access(imagePath, fs.constants.F_OK, async (err) => {
        if (err) {
            console.error('File does not exist:', imagePath);
            return res.status(500).send('File does not exist.');
        }

        const recieverMail = req.body.to; 
 
        if (typeof recieverMail !== 'string') {
            return res.status(400).send('Invalid recipient email.');
        }

        const newInvoiceFile = new InvoiceFile({
            filename: req.file.filename,
            path: imagePath,
            originalname: req.file.originalname,
            recieverMail: recieverMail 
        });
        console.log(req.body);

        try {
            await newInvoiceFile.save();  

            const mailOptions = {
                from: 'shobhithaas07@gmail.com',
                to: recieverMail,  
                subject: 'Here is your invoice!',
                text: 'Please find the attached invoice.',
                attachments: [
                    {
                        filename: req.file.originalname,
                        path: imagePath,
                    },
                ],
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).send('Error sending email.');
                }
                res.send('Email sent: ' + info.response);
            });
        } catch (dbError) {
            console.error('Error saving to database:', dbError);
            return res.status(500).send('Error saving to database.');
        }
    });
});

module.exports = router;

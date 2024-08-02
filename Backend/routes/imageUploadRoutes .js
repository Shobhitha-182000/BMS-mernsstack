// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router();


// const upload = multer({
//     dest: 'uploads/', // Directory where files are stored
//     limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
// });

// router.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
    
//     // Get the file URL
//     const fileURL = `http://localhost:3000/uploads/${req.file.filename}`;
    
//     console.log();
//     res.json({ imageURL: fileURL });
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
 

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
 
router.post('/api/send-email', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const imagePath = path.join(uploadDir, req.file.filename);
 
    console.log('File path:', imagePath);

     
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', imagePath);
            return res.status(500).send('File does not exist.');
        }

        const mailOptions = {
            from: 'shobhithaas07@gmail.com',
            to: req.body.to, 
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
    });
});

module.exports = router;

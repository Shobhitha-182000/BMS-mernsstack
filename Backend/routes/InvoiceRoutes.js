const { AddInvoice } = require('../controllers/InvoiceController');

const router=require('express').Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// //to store image
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
      
//       const imagesPath = path.join(__dirname, '..', '..', 'CLient', 'public','files');
//       cb(null, imagesPath);
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + path.extname(file.originalname);
//       cb(null, uniqueSuffix);
//     },
//   });
  
//   const upload = multer({ storage: storage });


router.post('/invoice',AddInvoice)


module.exports=router;
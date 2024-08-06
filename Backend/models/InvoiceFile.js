const mongoose = require('mongoose');

const invoiceFileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    originalname: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    recieverMail:{type:String}
});

const InvoiceFile = mongoose.model('InvoiceFile', invoiceFileSchema);

module.exports = InvoiceFile;

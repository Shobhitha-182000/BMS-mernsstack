const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    description: String,
    rate: Number,
    qty: Number,
    amount: Number
});

const InvoiceSchema = new Schema({
    logo: String,
    invoice_no: String,
    company: String,
    bill_to: String,
    date: Date,
    due_date: Date,
    items: [ItemSchema],  // Define items as an array of ItemSchema
    sub_total: Number,
    tax: Number,
    discount: Number,
    total: Number,
    note: String
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;

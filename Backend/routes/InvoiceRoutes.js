const { AddInvoice, getOneInvoice, EditInvoice, getAllInvoice } = require('../controllers/InvoiceController');

const router = require('express').Router();




router.post('/invoice', AddInvoice)
router.put('/invoice/:invoice_no', EditInvoice)
router.get('/invoice/:invoice_no', getOneInvoice);
router.get('/invoice', getAllInvoice);


module.exports = router;
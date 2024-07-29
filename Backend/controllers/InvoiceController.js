const Invoice = require("../models/Invoice");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const imagesPath = path.join(__dirname, '..', '..', 'Client', 'public', 'files');
        cb(null, imagesPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage }).single('logo');

const AddInvoice = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "File upload error" });
        }

        try {
            const {
                invoice_no,
                company,
                bill_to,
                date,
                due_date,
                items,
                qty,
                rate,
                sub_total,
                tax,
                amount,
                discount,
                total,
                Note,
            } = req.body;

            const logo = req.file.filename;
            console.log('logo',logo);
            console.log('total',total);
            const formattedDate = formatDate(date);
            const formattedDueDate = formatDate(due_date);

            // const amount = qty * rate;
            // const total = sub_total + tax;
            // const calculatedTax = (amount * 0.18 + amount - discount);

            const newInvoice = await Invoice.create({
                logo,
                invoice_no,
                company,
                bill_to,
                date: formattedDate,
                due_date: formattedDueDate,
                items,
                qty,
                rate,
                amount,
                total,
                sub_total,
                tax,
                discount,
                Note,
            });

            return res.status(200).json({ data: newInvoice, message: "Invoice created successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
const getOneInvoice=async(req,res)=>{
     try {
        const {invoice_no}=req.params;

    const invoice=await Invoice.findOne({invoice_no});
    console.log(invoice_no);
    if(invoice){
        const details=invoice.date;

        console.log(invoice);
        return res.status(202).json({data:invoice,message:'Found'})
    }
    return res.status(401).json({message:'Not Found'})
        
     } catch (error) {
        console.log(error);
     }
    
}

module.exports = { AddInvoice ,getOneInvoice};

function formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
}

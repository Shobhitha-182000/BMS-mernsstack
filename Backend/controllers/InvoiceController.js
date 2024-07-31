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
            console.log('logo', logo);
            console.log('total', total);

            const formattedDate = formatDate(date);
            const formattedDueDate = formatDate(due_date);

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


const EditInvoice = async (req, res) => {
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

            const logo = req.file ? req.file.filename : null;

            const formattedDate = formatDate(date);
            const formattedDueDate = formatDate(due_date);

            const invoice = await Invoice.findOne({ invoice_no });
            if (!invoice) {
                return res.status(404).json({ message: "Invoice not found" });
            }

            invoice.company = company || invoice.company;
            invoice.bill_to = bill_to || invoice.bill_to;
            invoice.date = formattedDate || invoice.date;
            invoice.due_date = formattedDueDate || invoice.due_date;
            invoice.items = items || invoice.items;
            invoice.qty = qty || invoice.qty;
            invoice.rate = rate || invoice.rate;
            invoice.sub_total = sub_total || invoice.sub_total;
            invoice.tax = tax || invoice.tax;
            invoice.amount = amount || invoice.amount;
            invoice.discount = discount || invoice.discount;
            invoice.total = total || invoice.total;
            invoice.Note = Note || invoice.Note;

            if (logo) {
                invoice.logo = logo;
            }

            await invoice.save();

            return res.status(200).json({ data: invoice, message: "Invoice updated successfully" });
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

module.exports = { AddInvoice ,getOneInvoice,EditInvoice};

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}


 
const Mongoose=require('mongoose');
const  { v4: uuidv4 } = require('uuid'); 

const invoiceSchema=new Mongoose.Schema({
    logo:{
       type:String
    },
    invoice_no:{
        type: String,
        unique: true,
        default: function() {
          return `INV-${uuidv4()}`;
        }
    },
    company:{
        type:String,
        required:true    
    },
    bill_to:{
        type:String,
       
    },
    date:{
        type:String,
        default:Date.now
    },
    due_date:{
        type:Date,
        default:Date.now
    },
    items:{
        type:String,
        required:true 
    },
    qty:{
        type:Number,
        
    },
    amount:{
        type:Number,
        
    },
    rate:{
        type:Number,
        
    },
    total:{
        type:Number,
        
    },
    sub_total:{
        type:Number,
         
    },
    tax:{
        type:Number,
        
    },
    discount:{
        type:Number,
        
    },Note:{
        type:String
    }

},{})

const InvoiceModel=Mongoose.model('Invoices',invoiceSchema);

module.exports=InvoiceModel;
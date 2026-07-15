const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number
            },
            price:{
                type:Number
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    },
    orderStatus:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Order",OrderSchema);
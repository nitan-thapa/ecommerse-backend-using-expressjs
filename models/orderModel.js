const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const orderSchema=new mongoose.Schema({

    orderItems:[{
        type:ObjectId,
        required:true,
        ref:'OrderItem'
    }],
    shippingAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    zip:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:'pending'
    },
    user:{
        type:ObjectId,
        required:true,
        ref:'User'

    },
    orderDate:{
        type:Date,
        default:Date.now()
    },

    totalPrice:{
        type:Number,
        required:true

    }



})

module.exports=mongoose.model('Order',orderSchema)
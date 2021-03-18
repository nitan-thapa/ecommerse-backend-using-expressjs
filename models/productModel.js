const mongoose=require('mongoose')

const {ObjectId} = mongoose.Schema



const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim: true
    },  

    product_price:{
        type: Number,
        required:true,
        trim:true
    },

    product_quantity:{
        type: Number,
        require: true,
        trim: true
    },

    category:{
        type:ObjectId,
        required:true,
        ref:'Category'
    },

    product_image:{
        type: String,
        require: true,
        trim: true,

    },

    product_description:{
        type: String,
        require:true,
        minLength:20
    },

    product_rating:{
        type: Number,
        default:0,
        max:5
    }
    



},{timestamps:true})

module.exports = mongoose.model ('Product',productSchema)

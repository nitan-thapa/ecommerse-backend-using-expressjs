const mongoose=require('mongoose')

const {ObjectId}=mongoose.Schema

const tokenSchema=new mongoose.Schema({
token:{
    type:String,
    required:true
},
userId:{
    type:ObjectId,
    require:true,
    ref:'User'
},
createdAt:{
    type:Date,
    default:Date.now(),
    expires:3600
}
})


module.exports=mongoose.model('Token',tokenSchema)
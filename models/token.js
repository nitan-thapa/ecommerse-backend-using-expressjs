const mongoose=require('mongoose')
const sendEmail = require('../utils/verifyEmail')

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


//resend email confirmation
 exports.resendConfirmationToken=(req,res)=>{
     //find the valid user
     User.findOne({email:rec.body.email},(errror,user)=>{
            if (error || !user){
                return res.status(400).json({error:"Sorry the email provided is not found in our system"})
            }
            if(user.isVerified){
                return res.status(400).json({error:"The email is already verified please login to continue"})
            }
     })
 }

module.exports=mongoose.model('Token',tokenSchema)
const User=require('../models/userModel')

exports.postUser=(req,res)=>{
    let user = new User (req.body)
    user.save((error,users)=>{
        if (error || !users){
            return res.status(400).json({error:'something went wrong'})
        }
        res.json({users})
    })
}
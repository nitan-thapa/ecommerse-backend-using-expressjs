const User=require('../models/userModel')
const { signUpValidation } = require('../validation')

const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const { Router } = require('express')

exports.postUser=(req,res)=>{
    let user = new User(req.body)
    user.save((error,users)=>{
        if (error || !users){
            return res.status(400).json({error:'something went wrong'})
        }
        res.json({users})
    })
}





exports.signin=(req,res)=>{
    const{email,password}=req.body
    //make sure email doesnt exists
    User.findOne({email},(error,user)=>{
        if(error||!user){
            return res.status(400).json({error:"Sorry user with that email doesnot exist"})
        }
        //make sure email and password match

        if (!user.authenticate(password)){
            return res.status(400).json({error:"Email and password doesnot match"})
        }

        //assign token to signin user with user id and jwt secret 

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

        //cookie
        res.cookie('t',token,{expire:Date.now()+99999})

        const{id,name,emai,role}=user
        res.json({token,user:{id,name,email}})

    })
}

//For Signout 

exports.signout=(req,res)=>{
    res.clearCookie('t');
    res.json({message:"Signout Success"})
}


//Authorization

exports.requireSignIn=expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms:['HS256'],
    userProperty:"auth"
})


//Find User by id
exports.UserById=(req,res,next,id)=>{
    User.findById(id).exec((error,user)=>{
        if (error || !user){
            return res.status(400).json({error:"User Not Found"})
        }
        req.profile=user;
        next();
    })
}

// to show single user
exports.userDetails=(req,res)=>{
    res.json(req.profile)
}
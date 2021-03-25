const User=require('../models/userModel')
const { signUpValidation } = require('../validation')
const Token=require('../models/token')
const crypto=require('crypto')
const sendEmail=require('../utils/verifyEmail')

const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const { request } = require('http')


exports.postUser=(req,res)=>{
    let user = new User(req.body)
    user.save((error,users)=>{
        if (error || !users){
            return res.status(400).json({error:'something went wrong'})
        }

        const token=new Token({
            userId:users._id,
            token:crypto.randomBytes(16).toString('hex')

        })
        token.save((error,token)=>{
            if(error || !token){
                return res.status(400).json({error:error})
            }
            sendEmail({
                to:users.email,
                form:'no-reply@myecommerceapp.com',
                subject:'Email Verification Link',
                text:'Hello,'+user.email+',\n\n'+'Please Verify your account by clicking the link below link: \n\nhttp:\/\/'+req.headers.host+'\/api\/confirmation\/'+token.token
            })
            
        })
            

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

        //Check is email is verified

        if(!user.isVerified){
            return res.status(400).json({error:"Please verify your account before login"})
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

exports.isAuth=(req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id==req.auth._id
    if(!user){
        res.status(403).json({error:"You are not authorised to access this page"})
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({error:"This is admin resource, you are not authorised."})
    }
    next()
}
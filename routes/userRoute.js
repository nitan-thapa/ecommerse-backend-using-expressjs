const express = require('express');
const { postUser, signin, signout, userDetails, UserById, requireSignIn, isAuth, confirmationEmail } = require('../controller/user');
const { signUpValidation } = require('../validation');
const router = express.Router();


router.post('/postuser',signUpValidation,postUser)
router.post('/signin',signin)
router.post('/signout',signout)

router.param('userId',UserById)
router.get('/userdetails/:userId',userDetails)

router.post('/confirmation/:token',confirmationEmail);



module.exports=router;
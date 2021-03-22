const express = require('express');
const { postUser, signin } = require('../controller/user');
const { signInValidation } = require('../validation');
const router = express.Router();


router.post('/postuser',postUser)
router.post('/signin',signInValidation,signin)



module.exports=router;
const express = require('express');
const { postUser } = require('../controller/user');
const router = express.Router();


router.post('/postuser',postUser)



module.exports=router;
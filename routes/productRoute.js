const express = require('express');
const { postProduct } = require('../controller/product');
const router = express.Router();


//Routes

router.post('/postproduct',postProduct)



module.exports=router;
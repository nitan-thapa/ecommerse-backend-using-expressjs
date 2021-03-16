const express = require('express');
const { postProduct } = require('../controller/product');
const { productValidation } = require('../validation');
const router = express.Router();


//Routes

router.post('/postproduct',productValidation, postProduct)



module.exports=router;
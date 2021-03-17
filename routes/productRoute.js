const express = require('express');
const { postProduct, getAllProducts } = require('../controller/product');
const { productValidation } = require('../validation');
const router = express.Router();


//Routes

router.post('/postproduct',productValidation, postProduct)
router.get('/getproduct', getAllProducts)



module.exports=router;
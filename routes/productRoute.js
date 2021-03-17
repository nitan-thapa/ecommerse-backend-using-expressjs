const express = require('express');
const { postProduct, getAllProducts, readProduct, productById } = require('../controller/product');
const { productValidation } = require('../validation');
const router = express.Router();


//Routes

router.post('/postproduct',productValidation, postProduct)
router.get('/getproduct', getAllProducts)

router.param('productId',productById)
router.get('/singleproduct/:productId',readProduct)


module.exports=router;
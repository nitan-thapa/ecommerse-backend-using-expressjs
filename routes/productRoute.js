const express = require('express');
const { postProduct, getAllProducts, readProduct, productById } = require('../controller/product');
const { productValidation } = require('../validation');
const upload= require('../middleware/file-upload');
const { requireSignIn, isAdmin } = require('../controller/user');
const router = express.Router();



//Routes

router.post('/postproduct',upload.single('product_image'),requireSignIn, productValidation, postProduct)
router.get('/getproduct', getAllProducts)

router.param('productId',productById)
router.get('/singleproduct/:productId',readProduct)


module.exports=router;
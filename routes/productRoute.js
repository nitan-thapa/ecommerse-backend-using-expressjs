const express = require('express');
const { postProduct, getAllProducts, readProduct, productById } = require('../controller/product');
const { productValidation } = require('../validation');
const router = express.Router();
const upload= require('../middleware/file-upload')


//Routes

router.post('/postproduct',upload.single('product_image'),productValidation, postProduct)
router.get('/getproduct', getAllProducts)

router.param('productId',productById)
router.get('/singleproduct/:productId',readProduct)


module.exports=router;
const express = require('express');
const { postProduct, getAllProducts, readProduct, productById, listRelated, listBySearch, listSearch } = require('../controller/product');
const { productValidation } = require('../validation');
const upload= require('../middleware/file-upload');
const { requireSignIn, isAdmin, UserById } = require('../controller/user');
const { listeners } = require('../models/productModel');
const router = express.Router();



//Routes

router.post('/postproduct/:userId', requireSignIn, isAdmin ,upload.single('product_image'), productValidation, postProduct)
router.get('/getproduct', getAllProducts)

router.param('productId',productById)
router.get('/singleproduct/:productId',readProduct)

router.get('/products/related/:productId', listRelated)

router.post('/products/by/search',listBySearch)

router.get('/products/search',listSearch)

router.param('userId',UserById)


module.exports=router;
const { Router } = require('express');
const express = require('express');
const { postCategory, categoryById, readCategory, deleteCategory, updateCategory, findCategory } = require('../controller/category');
const router = express.Router();

// router.get('/abc',Hello)
router.post('/postcategory',postCategory)
router.param('categoryId',categoryById)

router.get('/singlecategory/:categoryId',readCategory)
router.delete('/deletecategory/:categoryId',deleteCategory)
router.put('/updatecategory/:categoryId',updateCategory)

router.get('/showcategory',findCategory)

module.exports=router;
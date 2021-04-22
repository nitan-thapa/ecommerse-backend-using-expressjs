
const express = require('express');
const { postCategory, categoryById, readCategory, deleteCategory, updateCategory, findCategory } = require('../controller/category');
const {requireSignIn, isAdmin, UserById} = require('../controller/user')
const router = express.Router();

// router.get('/abc',Hello)
router.post('/postcategory/:userId', requireSignIn, isAdmin, postCategory)
router.param('categoryId',categoryById)

router.get('/singlecategory/:categoryId',readCategory)
router.delete('/deletecategory/:categoryId/:userId', requireSignIn, isAdmin, deleteCategory)
router.put('/updatecategory/:categoryId/:userId', requireSignIn, isAdmin, updateCategory)

router.get('/showcategory',findCategory)

router.param('userId',UserById)

module.exports=router;
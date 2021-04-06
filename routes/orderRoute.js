const express=require('express')
const { postOrderItem, getOrderList, postOrder, getOrder, updateStatus } = require('../controller/order')
const router=express.Router()

router.post('/orderitem',postOrderItem)
router.post('/postorder',postOrder)
router.get('/orderlist',getOrderList)
router.get('/orderlist/:id',getOrder)
router.put('/statusupdate/:id',updateStatus)
module.exports=router
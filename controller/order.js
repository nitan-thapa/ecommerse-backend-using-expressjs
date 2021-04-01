const OrderItem=require('../models/orderitemModel')
const Order=require('../models/orderModel')



exports.postOrderItem=(req,res)=>{
    let newOrderItem=new OrderItem({
        quantity:req.body.quantity,
        product:req.body.product
    })
    newOrderItem.save((error,result)=>{
        if(error || !result){ 
            return res.status(400).json({error:"Unable to save order item"})
        }
        res.json({result})
    })
}
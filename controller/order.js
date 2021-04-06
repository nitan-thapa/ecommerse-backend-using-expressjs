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

exports.postOrder=async(req,res)=>{
    const orderItems = req.body.orderItems
    const totalPrice = await Promise.all(orderItems.map(async(orderItemId)=>{
    const item = await OrderItem.findById(orderItemId).populate('product','product_price')
    const total = item.product_price * item.quantity
    return total
    })
    )
    const TotalPrice=totalPrice.reduce((a,b)=>a+b,0)
    
    const order = new Order({
         orderItems:req.body.orderItems,
         shippingAddress:req.body.shippingAddress,
         city:req.body.city,
         phone:req.body.phone,
         zip:req.body.zip,
         user:req.body.user,
         totalPrice:TotalPrice
    }) 
    await order.save();
    if(!order){
        return res.status(400).json({error:"failed"})
    }
    res.json({order})

}

//to show all order
exports.getOrderList=(req,res)=>{
    Order.find().sort({orderDate:-1}).exec((error,order)=>{
        if(error || !order){
            return res.status(400).json({error:"no order found"})
        } 
        res.json({order})
    })
}


//to show single order
exports.getOrder=(req,res)=>{
    Order.findOne(req.params.id).exec((error,order)=>{
        if(error || !order){
            return res.status(400).json({error:error})
        }
        res.json({order})
    })
}
//To update Status
exports.updateStatus=(req,res)=>{

    const order=Order.findByIdAndUpdate(
        req.params.id,
        {status:req.body.status},
        {new:true}

        )
        if(!order){
            return res.status(400).json({error:"Failed to Update"})
        }
        res.json({message:"Status Updated"})
}
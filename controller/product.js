const Product=require('../models/productModel')

//To post product
exports.postProduct=(req,res)=>{

    let product = new Product({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_quantity:req.body.product_quantity,
        category:req.body.category,
        product_description: req.body.product_description,
        product_rating: req.body.product_rating
    })
    product.save((error,products)=>{
        if (error || !products){
            return res.status(400).json({error:"Something Went Wrong"})
        }
            res.json({products})
    })

}
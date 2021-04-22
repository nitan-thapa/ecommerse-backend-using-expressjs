const Product=require('../models/productModel')
const { productValidation } = require('../validation')

//To post product
exports.postProduct=(req,res)=>{

    let product = new Product({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_quantity:req.body.product_quantity,
        category:req.body.category,
        product_image:req.file.path,
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

//To get All Product
exports.getAllProducts=(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.order ? req.query.sortBy : '_id'
    let limit = req.query.order ? parseInt(req.query.limit) : 6

    Product.find()
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)

        .exec((error, products) => {
            if (error || !products) {
                return res.status(400).json({
                    error: 'product not found'
                });
            }

            res.json(products)


        });
}

//Single product by ID

exports.productById=(req, res, next, id)=>{
    Product.findById(id)
    .populate('category','category_name')
    .exec((error,product)=>{
        if(error || !product){
            return res.status(400).json({error:"Product not found"})
        }
        req.product=product
        next(); 
    })
}

exports.readProduct=(req,res)=>{
    return res.json(req.product)
 }

 


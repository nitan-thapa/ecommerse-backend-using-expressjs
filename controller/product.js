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

 

 //get related products

 exports.listRelated=(req,res)=>{
     let limit=req.query.limit ? parseInt(req.query.limit):6

     Product.find({_id:{$ne:req.product},category:req.product.category})
     .limit(limit)
     .populate('category','category_name')
     .exec((err,products)=>{
         if(err){
            return res.status(400).json({
                error:'Products not found'
            });
         }
         res.json(products);
     });
 };

 

 //filter by category and price range
 exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "product_price") {
                // gte -  greater than price [0-1000]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


//to search product
exports.listSearch=(req,res)=>{
    //create query object to hold search value and category value
    const query={}
    //assign search value to query.name
    if(req.query.search){
        query.product_name={$regex:req.query.search,$options:'i'}
        //assign category value to query.category
        if(req.query.category && req.query.category !='All'){
            query.category=req.query.category
        }
        //find the product based on query object with 2 properties
        //search and category
        Product.find(query,(error,products)=>{
           if(error){
               return res.status(400).json({
                   error:error
               })
           }
           res.json(products);
        })
    }
};
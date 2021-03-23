exports.productValidation=(req,res,next)=>{
    req.check('product_name','Product name must be required').notEmpty();
    req.check('product_price','Product price must be required').notEmpty()
    .isNumeric()
    .withMessage('product price contains numeric value only')
    req.check('product_quantity','Quantity must be required').notEmpty()
    .isNumeric()
    .withMessage('quantity should be numeric value')
    req.check('product_description','Description must be required').notEmpty()
    .isLength({
        min:20
    })
    .withMessage('description must be more than 20 characters')
    req.check('category','Category must be required').notEmpty()

    const errors=req.validationErrors()
    if(errors){
        const showErrors=errors.map(error=>error.msg)[0]
        return res.status(400).json({error:showErrors})
    }
    next();
}


exports.signUpValidation=(req,res,next)=>{
    req.check('name','Name is required').notEmpty();
    req.check('email','Email is required').notEmpty()
    .isEmail()
    .withMessage('Invalid Email ID')
    req.check('password','Password is required').notEmpty()
    .isLength({
        min:6
    })
    .withMessage('password must be more than 6 characters.')

    const errors=req.validationErrors()
    if (errors){
        const showErrors=errors.map(error=>error.msg) [0]
        return res.status(400).json({error:showErrors})
    }
    next();
}
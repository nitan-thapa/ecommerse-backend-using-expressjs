const Category=require('../models/categoryModel');

// exports.Hello=(req,res)=>{
//     res.send('hello from controller');
// }

//To insert Data
exports.postCategory=(req,res)=>{
    let category = new Category({
        category_name:req.body.category_name
    })

    Category.findOne({category_name:category.category_name},(error,data)=>{
        if (data==null){

             category.save((error,category)=>{
                if(error || !category){
                    return res.status(400).json({error:'Something went wrong'})
                }
                return res.json({category})
            })
        }
        else{
        res.status(400).json({error:'category name must be unique'})
        }
    })


}


exports.categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((error,category)=>{
        if(error || !category){
            return res.status(400).json({error:"Category not found"})
        }
        req.category=category
        next(); 
    })

    

}
exports.readCategory=(req,res)=>{
   return res.json(req.category)
}

// to delete category
exports.deleteCategory=(req,res)=>{
    let category=req.category
    category.remove((error,result)=>{
        if(error || !result){
            return res.status(400).json({error:"Something went wrong"})
        }
        res.json({message:"category deleted"})
    })
}

// to update category

exports.updateCategory=(req,res)=>{
    let category=req.category
    category.category_name=req.body.category

    category.save((error,category)=>{
        if(error || !category){
            return res.status(400).json({error:"Failed to update Category"})

        }
        res.json({message:"category updated successfully"})
    })
}


//Show Category

exports.findCategory=(req,res)=>{

    Category.find((error,data)=>{
     if (error || !data){
         return res.status(400).json({error:"Category Not Found"})
     }
     res.json(data)
    
    })

}
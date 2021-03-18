const multer = require('multer')
const path = require('path')
const fs = require ('fs')




const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let fileDestination = 'public/uploads/'
         
        //Check if directory exists
        if (!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination, { recursive:true }) //recursive: true creates parent folder as well as sub folders.
            cb(null, fileDestination)
        }else{
                cb(null, fileDestination)
            }
        },

    filename: (req, file, cb)=> {
        //path.basename('/foo/bar/baz/asdf/quxx.html');
        //Returns: 'quxx.html'

        //path.basename('foo.bar/baz/asdf/quxx.html','.html');
        //Returns: 'quxx'
        let filename = path.basename(file.originalname, path.extname(file.originalname))
        let ext = path.extname(file.originalname)
        cb(null, filename + '_' + Date.now() + ext)
    },
})


let imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|JPG|JPEG|PNG|SVG)$/)) {
        return cb(new Error('You can upload an image file only'),false)
    }
    cb(null, true)
}

let upload = multer({
    storage:storage,
    fileFilter: imageFileFilter,
    limits:{
        fileSize: 2000000, //2MB
    },
})

module.exports = upload;
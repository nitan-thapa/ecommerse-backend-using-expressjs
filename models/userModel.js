const mongoose=require('mongoose')
const crypto=require('crypto');
const uuidv1=require('uuidv1')


const userSchema= new mongoose.Schema({
    name:{
        type: String,
        require:true,
        trim: true,

    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    hashed_password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


//Virtual Fields
userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encrypytPassword(password)
})

.get(function(){
    return this._password //temporary variable
})

//methods
userSchema.methods={
    encrypytPassword:function(password){
        if (!password) return ''
        try{
            return crypto
            .createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }
        catch(err){
            return ''

        }
    },
    authenticate:function(plainText){
        return this.encrypytPassword(plainText)==this.hashed_password
    }

}


module.exports=mongoose.model('User',userSchema)
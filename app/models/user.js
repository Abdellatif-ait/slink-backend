const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const joi=require('joi')
const passwordComplexity=require("joi-password-complexity")

const userSchema=new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    URL:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            }
        }
    ]
},{
    timestamps:true,
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id},process.env.JWTPRIVATEKEY,{expiresIn:60*60*1})
    return token
}
const userModel=mongoose.model("User",userSchema)

const validate=(data)=>{
    const schema=joi.object({
        username:joi.string().required().label('username'),
        email:joi.string().email().required().label("email"),
        password:passwordComplexity().required().label("password")
    })
    return schema.validate(data)
}
module.exports={userModel,validate}
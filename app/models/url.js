const mongoose=require('mongoose')
const shortid=require('shortid')

const urlSchema=mongoose.Schema({
    fullLink:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    shortLink:{
        type:mongoose.Schema.Types.String,
        required:true,
        default:shortid.generate
    }
})
const urlModel=mongoose.model("URL",urlSchema)

module.exports=urlModel
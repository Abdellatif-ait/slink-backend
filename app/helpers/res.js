function invalidReq(req,res){
    res.status(400).json({message:"We cant handle this request!!"})
}

module.exports=invalidReq
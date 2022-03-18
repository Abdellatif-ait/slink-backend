const express=require('express');
const router=express.Router();
const invalidReq=require("../helpers/res")
const {getall,getone,addone,deleteone}=require('../controllers/urlControl')


router.get("/:user",getall)
router.get('/l/:shortlink',getone)
router.post('/add',addone)
router.delete('/delete',deleteone)
router.all('*',invalidReq)

module.exports=router
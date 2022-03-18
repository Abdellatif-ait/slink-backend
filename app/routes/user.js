const express=require("express");
const invalidReq=require("../helpers/res")
const {logIn,register}=require('../controllers/userControl')
const router=express.Router();

router.post('/login',logIn)
router.post('/register',register)
router.all('*',invalidReq)

module.exports=router
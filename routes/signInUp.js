const express=require('express')

const router=express.Router();

const signInUpController=require('../controllers/signInUpController')

console.log("SignInUp Router Loaded")

router.get('/',signInUpController.signIn)
router.get('/signup',signInUpController.signUp)

module.exports=router;
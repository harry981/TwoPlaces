const express=require('express')

const router=express.Router();

const signInUpController=require('../controllers/signInUpController')

console.log("SignInUp Router Loaded")

router.get('/',signInUpController.signIn)
router.get('/signup',signInUpController.signUp)
router.post('/signup/create',signInUpController.create)
router.post('/create-session',signInUpController.createSession)

module.exports=router;
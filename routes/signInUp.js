const express=require('express')

const router=express.Router();

const passport=require('passport')

const signInUpController=require('../controllers/signInUpController')

console.log("SignInUp Router Loaded")

router.get('/',signInUpController.signIn)
router.get('/signup',signInUpController.signUp)
router.post('/signup/create',signInUpController.create)

//use passport as a middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/signin'}
),signInUpController.createSession)


router.get('/sign-out',signInUpController.destroySession)

module.exports=router;
const express=require('express')

const router=express.Router();

const passport=require('passport')

const userController=require('../controllers/users_controller')

console.log("User Router Loaded")

router.get('/',passport.checkAuthentication,userController.profile)

module.exports=router;
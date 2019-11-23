const express=require('express')

const router=express.Router();

const passport=require('passport')

const userController=require('../controllers/users_controller')

console.log("User Router Loaded")

router.get('/profile/:id',passport.checkAuthentication,userController.profile)
debugger;
router.post('/update/:id',passport.checkAuthentication,userController.update)

module.exports=router;
const express=require('express')

const router=express.Router();

const userController=require('../controllers/users_controller')

console.log("User Router Loaded")

router.get('/',userController.profile)

module.exports=router;
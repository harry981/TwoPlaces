const User=require('../../../models/user')
const jwt=require('jsonwebtoken')

module.exports.createSession=async function(req,res){
  //  req.flash('success','Logged in Successfully !!')
  //  return res.redirect('/users');
 try{
  let user=await User.findOne({email:req.body.email})

  if(!user || user.password!=req.body.password){
      return res.json(422,{
          message:"Invalid username/Password"
      })
  }

  return res.json(200,{
      message:"Sign In Successful , here is your token, keep it safe.",
      data:{
          token:jwt.sign(user.toJSON(),'Harshit',{
              expiresIn:'100000'
          })
      }
  })

 }
 catch(err){
     console.log('******* jwt',err)
     return res.json(500,{
         message:"Internal Server Error"
     })
 }

}
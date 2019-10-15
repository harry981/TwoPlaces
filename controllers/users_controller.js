const Users=require('../models/user')

module.exports.profile=function(req,res){
        if(req.cookies.user_id)
        {     
                Users.findById(req.cookies.user_id,function(err,user){
                      if(user)
                      {
                        return res.render('user_profile',{title:user.name,user:user})
                      }
                      else
                      {
                              return res.redirect('/signin')
                      }
                })
        
              
        }
        else
        {
              return res.redirect('/signin')
        }
}
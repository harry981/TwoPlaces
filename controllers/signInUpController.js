const User=require('../models/user')

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users')
    }
   // console.log(req.isAuthenticated())
    return res.render('user_sign_in',{title:"Codial | Sign In"})
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users')
    }
    //console.log(req.isAuthenticated())
    return res.render('user_sign_up',{title:"Codial | Sign Up"})
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back')
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user !!!');
            return;
        }
         
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating the user !!!')
                    return;
                }

                console.log('user created successfully',user)
                return res.redirect('/signin')
            })
        }
        else{
            return res.redirect('back')
        }
        
    })

}


module.exports.createSession=function(req,res){
    return res.redirect('/users');
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/signin')
}
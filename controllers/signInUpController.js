const User=require('../models/user')

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{title:"Codial | Sign In"})
}

module.exports.signUp=function(req,res){
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
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user !!!');
            return;
        }

        //handle user found
        if(user){

            //handle password which doesn't match

            if(user.password!=req.body.password){
                return res.redirect('back')
            }

            //handle session
            res.cookie('user_id',user.id);
            return res.redirect('/users')

        }
        else{
            //handle user not found
            return res.redirect('back')
        }
    })
}
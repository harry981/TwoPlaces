const passport=require('passport')

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user')

//authentication using passport
passport.use(new LocalStrategy({

    usernameField:'email',
    passReqToCallback:true

},

 function(req,email,password,done){
     //find a user and establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err)
                console.log('Error in finding the user ----> Passport Authentication')
            
                return done(err)
            }

            if(!user || user.password!=password){
                req.flash('error','Invalid Username/Password')
                console.log('Invalid username/password')
                return done(null,false) // err,authentication=false
            }

            return done(null,user);

        })
 }

))

//serializing the user to decide which key is to be kept in the cookies 

passport.serializeUser(function(user,done){
    done(null,user._id)
})


// deserializing the user from the key in the cookies and finding the user in the database

passport.deserializeUser(function(id,done){
    
    User.findById(id,function(err,user){
       if(err){
           req.flash('error',"")
        console.log('Error in finding the user ----> Passport Authentication')
            
        return done(err)
       }
       else
       {
          return done(null,user);
       }
    })
})

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){

    //if user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
        console.log(req.isAuthenticated())
        //if the user is not signed in 
        return res.redirect('/signin')
    }
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next()
}

module.exports=passport;



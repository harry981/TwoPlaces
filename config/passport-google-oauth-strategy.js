const passport=require('passport')

const googleStrategy=require('passport-google-oauth').OAuth2Strategy

const crypto= require('crypto')

const User=require('../models/user')
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"804912192936-6pn4933m6050j6gpikno7edjcl571h5m.apps.googleusercontent.com",
    clientSecret:"-fekXtfAjLIdhDnbnjfHk3Z0",
    callbackURL:"http://localhost:1021/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("*********** google oauth",err)
                return
            }
            console.log("profile",profile)
//if found , set this user as req.user
            if(user){
                return done(null,user)
            }
            else{
                //if not found create a new user in db 
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                       if(err){
                           console.log('*********** error in creating user',err)
                       return;
                        }
                        return done(null,user)
                })
            }
        })
    }
))

module.exports=passport
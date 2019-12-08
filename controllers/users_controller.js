const User=require('../models/user')
const fs=require('fs')
const path=require('path')

module.exports.profile=function(req,res){
User.findById(req.params.id,function(err,user){
        return res.render('user_profile',
        {
                title:"Users",
                profile_user:user

})
})
       
}

module.exports.update=async function(req,res){
        // if(req.user.id==req.params.id){
        //         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        //               return res.redirect('back')
        //         })
        // }
        // else{
        //         return res.status(401).send('Unauthorized')
        // }

        if(req.user.id==req.params.id){
                 try{
                     let user=await User.findById(req.params.id);
                     User.uploadedAvatar(req,res,function(err){
                             if(err){
                                     console.log('********* Multer Error *********')
                             }

                             console.log(req.file)
                             console.log('Req Body',req.body)
                             user.name=req.body.name;
                             user.email=req.body.email
                             if(req.file){

                                if(user.avatar){
                                     fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                                }
                                     //this is saving the path of the uploaded file into the avatar field of the user
                                     user.avatar=User.avatarPath+'/'+req.file.filename
                             }
                             user.save();
                             return res.redirect('back')
                     })
                 }catch(err)
                 {
                         console.log(err)
                       req.flash('error',err)
                       return res.redirect('back')
                 }
        }
        else{
                req.flash('error','Unauthorized')
                return res.status(401).send('Unauthorized')
        }

}
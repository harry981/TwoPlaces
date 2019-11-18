const comment=require('../models/comment')

const Post =require('../models/post')

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id 
            }),function(err,comment){
                //handle error
                if(err){
                    console.log('error in creating comments')
                }

                console.log('comment object',comment);
                post.comments.push(comment)
                console.log('updated')
                post.save();//whenever you update an object do save so that changes are made in the database also 

                res.redirect('back')
            }
        }
    })
}
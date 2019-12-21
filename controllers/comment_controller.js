const Comment=require('../models/comment')

const Post =require('../models/post')

const commentsMailer=require('../mailers/comments_mailer')

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create(({
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

                comment=await comment.populate('user','name email').execPopulate();
                commentsMailer.newComment(comment)
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:"Post Created"
                    })
                }
                res.redirect('/')
            })
        }
    })
}

module.exports.destroy=function(req,res){
    comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){

            let postid=comment.post;
            comment.remove();
            //$pull pulls/throws the comment with particular id 
            Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post){
               return res.redirect('back')
            })
        }
        else{
            return res.redirect('back')
        }
    })
}
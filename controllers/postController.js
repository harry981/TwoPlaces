const Post=require('../models/post')

const Comment = require('../models/comment')

module.exports.create=async function(req,res){
   try{
     
    let post=await Post.create({
        content:req.body.content,
        user:req.user._id
    })
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:'Post Created'
        })
    }
    req.flash('success','Post created successfully !!')
    return res.redirect('back');
   }
   catch(err)
   {
    req.flash('error','Error !!')
      console.log(err)
      return;
   }


}

// module.exports.destroy=function(req,res){
//    Post.findById(req.params.id,function(err,post){
//     //.id means converting the object id to string   
//     if(post.user==req.user.id){
//         post.remove();

//         Comment.deleteMany({post:req.params.id},function(err){
//             return res.redirect('back')
//         })
//     }
//     else{
//         return res.redirect('back')
//     }
//    })
// }

module.exports.destroy=async function(req,res){
    let post=await Post.findById(req.params.id)

    if(post.user==req.user.id){
        post.remove();

        await Comment.deleteMany({post:req.params.id})

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'Post deleted successfully !'
            })
        }
        req.flash('success','Post and related comments deleted !')

        return res.redirect('back')
    }
    else{
        
        req.flash('error','Unable to delete the post')
        return res.redirect('back')
    }
 }

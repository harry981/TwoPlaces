const Post=require('../models/post')

const User=require('../models/user')

// module.exports.home=function(req,res){
//       // console.log(req.cookies)
//       // res.cookie('user_id',25);
//       // Post.find({},function(err,posts){
//       //       return res.render('home',{
//       //       title:"Social Development  | Posts ",
//       //       posts:posts
//       //       })      
//       // })
//       //populate the user of each post
//       Post.find({})
//       .populate('user')
//       .populate({
//             path:'comments',
//             populate:{
//                   path:'user'
//             }
//       })
//       .exec(function(err,post){
//            User.find({},function(err,users){
//             return res.render('home',{
//                   title:'Social Development | Codial',
//                   posts:post,
//                   all_users:users
//             })        
//            })
           
//       })
// }

module.exports.home= async function(req,res){
      //populate the user of each post

      try{
            let posts=await Post.find({})
            .populate('user')
            .populate({
                  path:'comments',
                  populate:{
                        path:'user'
                  }
            })
      
            let users=await User.find({})
      
                 return res.render('home',{
                  title:'Social Development | Codial',
                  posts:posts,
                  all_users:users
            })
      
      }
      catch(err){
             console.log(err);
             return;
      }
      
}

// using then 
// Post.find({}).populate().then(function(){

// })

// let posts=Post.find({}).populate('comments').exec();

// posts.then();


const Post=require('../models/post')

module.exports.home=function(req,res){
      // console.log(req.cookies)
      // res.cookie('user_id',25);
      // Post.find({},function(err,posts){
      //       return res.render('home',{
      //       title:"Social Development  | Posts ",
      //       posts:posts
      //       })      
      // })
      //populate the user of each post
      Post.find({})
      .populate('user')
      .populate({
            path:'comments',
            populate:{
                  path:'user'
            }
      })
      .exec(function(err,post){
           return res.render('home',{
                 title:'Social Development | Codial',
                 posts:post
           }) 
      })
}
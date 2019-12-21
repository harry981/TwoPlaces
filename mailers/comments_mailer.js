const nodeMailer=require('../config/nodemailer')

//another way of exporting a function
exports.newComment= (comment)=>{
   console.log('inside new comment mailer',comment)
   nodeMailer.transporter.sendMail({
       from:'arpan@codingninjas.in',
       to:comment.user.email,
       subject:"New Comment Published",
       html:'<h1>Yup, Your comment has been published !</h1>'
   },(err,info)=>{
       if(err){
           console.log('Error in sending the email')
            return;
        }

        console.log('Message Sent',info)
        return;

   })
}
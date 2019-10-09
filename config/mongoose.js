const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/social_development')

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"))

db.once('open',function(){
    console.log("Database connected :: MongoDB")
})

module.exports=db;
const express = require('express')

const app=express();

const port=8000  //const port=1021 

const expressLayout=require('express-ejs-layouts')

app.use(expressLayout);

//use express router
app.use('/',require('./routes'))

app.set('view engine','ejs')

app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server")
    }

    console.log('Server up and running on port : ',port)
})
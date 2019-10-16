const express = require('express')

const app=express();

const cookieParser=require('cookie-parser')

//used for session cookie
const expressSession=require('express-session')
const passport=require('passport')
const passportLocal=require('passport-local')

app.use(express.urlencoded())
app.use(cookieParser());

//const port=8000  
const port=1021 

const db=require('./config/mongoose')



app.use(express.static('./assets'))

const expressLayout=require('express-ejs-layouts')
//extract styles and scripts of sub pages into layout 

app.set('layout extractStyles',true);
app.set('layoutScripts',true);

app.use(expressLayout);

//use express router
app.use('/',require('./routes'))

app.set('view engine','ejs')

app.set('views','./views')

app.use(session({
    name:'Codial',
    //TODO Change the script before deployment in production mode
    secret:'Harshit',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:1000*60*100} 
}))

app.use(passport.initialize());
app.use(passport.session());


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server")
    }

    console.log('Server up and running on port : ',port)
})
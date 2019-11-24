const express = require('express')

const app=express();

const cookieParser=require('cookie-parser')

//used for session cookie
const session=require('express-session') 
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy')

const MongoStore=require('connect-mongo')(session)
const sassMiddleware=require('node-sass-middleware')

const flash=require('connect-flash')
const customMware=require('./config/middleware')

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

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


app.set('view engine','ejs')

app.set('views','./views')
//mongo store is used to store the session cookie in the db
app.use(session({
    name:'Codial',
    //TODO Change the script before deployment in production mode
    secret:'Harshit',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:1000*60*100},
    store:new MongoStore({
          mongooseConnection:db,
          autoRemove:'disabled'
    },
    function(err){
         console.log(err||'Connect-Mongo setup OK')
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'))


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server")
    }

    console.log('Server up and running on port : ',port)
})
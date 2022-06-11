const express = require('express')
const expresshandlebar = require('express-handlebars').engine
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const connectDB = require('./config/db')
const expresslayout = require('express-ejs-layouts')
const path = require('path')
require('dotenv').config({path:'./config/config.env'})
const Routerindex = require('./routes/index')
const Routeruser = require('./routes/user')
const passport = require('passport')
const Passport = require('./config/passport')
const flash = require('connect-flash')
const session = require('express-session')


app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({extended:true}))


// app.engine('ejs',
app.engine('.hbs', expresshandlebar({layoutsDir: `${__dirname}/views/layouts`, extname:'.hbs'}))
app.set('view engine', '.hbs')

app.use(session({
    secret:'temple',
    resave:true,
    saveUninitialized:true,
}));


app.use(passport.initialize());
app.use(passport.session())

Passport(passport)

app.use(flash());

app.use((req,res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})




connectDB()


app.use('/', Routerindex)
app.use('/users', Routeruser)


app.get('/',(req,res)=>{
    res.render('main', {layout:'main'})
})



const port = process.env.PORT

app.listen(port,()=>{
    console.log('you are connected')
})
const express = require('express')
const router = express.Router()
const Userdb = require('../models/Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')



router.get('/register',(req,res)=>{res.render('register',{layout:'register' })})




router.get('/login',(req,res)=>{res.render('login',{layout:'login'})})


router.post('/register', (req,res)=>{
    // res.send('you are now in the dashboard')
    // console.log(req.body.username)
    const {username, firstname, lastname, email, password1, password2 } = req.body
    let errors =[]

    if(!username || !firstname || !lastname || !email || !password1 || !password2){
        errors.push({msg: 'please fill all the fields'})

    }
    
    if(password1 !== password2){
        errors.push({msg:'please enter the correct field'})
    }

    if(password1.length < 6){
        errors.push({msg:'please your password should be more than six charater'})
    }

    if(errors.length > 0){
        res.render('register',{
            errors,layout:'register'
        })
        
    }else{
        Userdb.findOne({email:email}).then(user=>{
            if(user){
                res.render('register',{ layout:'register',username,firstname,
                lastname,email})

            }
            else{
               const newUser = new Userdb({
                   username,
                   firstname,
                   lastname,
                   email,
                   password1,
                   password2
               })
               
            
            Userdb.create({}).then(respose=>{console.log(respose) }).catch(err=>{console.error(err)})
              bcrypt.genSalt(10, (err,salt)=>{bcrypt.hash(newUser.password1, salt , (err,hash)=>{
                  if(err) throw err;


                  newUser.password1 = hash;
                  newUser.save().then(user=>{
                       req.flash('success_msg', 'You are now Registered and can log in ')
                       res.redirect('/users/login')
                    })
                  .catch(err=> console.log(err))
              })

              })
            }
        })


    }

})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard' ,
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next)
})


router.get('/logout',(req,res)=>{
    res.render('main',{layout:'main'})
})




module.exports = router
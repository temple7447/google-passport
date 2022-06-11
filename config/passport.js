const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const Userdb = require('../models/Users')


module.exports = (passport)=>{
    passport.use(new localStrategy({
            usernameField:'email',
            passwordField: 'password1'
        },(email,password1,done)=>{
            Userdb.findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false, {message : "that email is not register "})
                }
                bcrypt.compare(password1,user.password1,(err,ismatch)=>{
                    if(err) throw err;

                    if(ismatch){
                        return done(null,user)
                    }else{
                        return done(null,false,{message: 'the password is not correct'})
                    }
                })
            })
            .catch(err=>console.log(err))
        })
    )
        passport.serializeUser((user,done)=>{
            done(null,user.id)

        });

        passport.deserializeUser((id,done)=>{
            Userdb.findById(id, (err,user)=>{
                done(err,user)
            })
        })


}




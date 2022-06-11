const mongoose = require('mongoose')

const UserShema = new mongoose.Schema({
    username:{
        type:String,

    },
    firstname:{
        type:String,
       

    },
    lastname:{
        type:String,
    

    },
    email:{
        type:String,
        

    },
    password1:{
        type:String,
        
    },
    password2:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model('User', UserShema)






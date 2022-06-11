const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        
       const conn = await mongoose.connect(process.env.DATABASESNAME,{
            useUnifiedTopology:true,
            useNewUrlParser:true,

       })

       console.log('we are connected')

    } catch (error) {
        console.log(error)
        
    }

}













module.exports = connectDB
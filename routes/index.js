const express = require('express')
const router = express.Router()

router.get('/test',(req,res)=>{res.send('hello world')})

// starting page route
router.get('/start',(req,res)=>{
    res.render('start', { layout: 'starting'})
})



router.get('/dashboard',(req,res)=>{
    res.render('dashboard',{layout:'dashboard'})
})


module.exports = router
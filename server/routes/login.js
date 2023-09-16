const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');

router.post('/random',(req,res)=>{
    res.send("login")
})

router.post('/',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.user.id)
        res.redirect('/random');
    });

module.exports=router
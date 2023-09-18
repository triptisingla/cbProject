const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');

router.get('/fail',(req,res)=>{
    res.send({loginStatus:false})
})


router.post('/',
    passport.authenticate('local', { failureRedirect: '/login/fail' }),
    function (req, res) {
        console.log("logged in user : ",req.user.id)
        res.redirect('/success');
    });

module.exports=router
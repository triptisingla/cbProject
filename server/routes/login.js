const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');

router.use('/alag',(req,res)=>{
    res.send({loginStatus:false})
})

router.post('/',
    passport.authenticate('local', { failureRedirect: '/login/alag' }),
    function (req, res) {
        console.log(req.user.id)
        res.redirect('/profile');
    });

module.exports=router
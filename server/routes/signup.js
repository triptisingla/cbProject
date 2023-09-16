const path = require('path');
const express = require('express');
const router = express.Router();
const {addUser}=require('../controllers/signup')
// router.get('/', (req, res) => {
//     res.render('signup');
// });

router.post('/', addUser)


module.exports = router;
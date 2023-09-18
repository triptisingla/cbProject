const {User} = require("../models");

const getProfile=async(req,res)=>{
    try{
        let user=req.user;
        res.send({username:user.username,balance:user.balance})
    }
    catch{
        res.send(err);
    }
}
module.exports={
    getProfile
}
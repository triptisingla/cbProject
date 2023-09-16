// const client = require('../config/db');

const {User} = require("../models");

// const queries = require('../queries')


const addUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    let username = email;
    let user = await User.findOne({ where: { username:username } });
    if (user) {
        return res.status(201).send('already present');
    }
    else {
        // bcrypt.genSalt(saltRounds, async function (err, salt) {
        // bcrypt.hash(password, salt, async function (err, hash) {
        let users=await User.create({
            username,
            password
        })
        console.log(users)
        return res.status(200).send('registered')
        // });
        // });

    }

}
module.exports = { addUser }
    //email already exists
    // client.query(queries.checkEmailExists, [username], (error, results) => {
    //     // console.log("results 1",results.rows[0].s)
    //     if (results.rows.length) {
    //         console.log("results 2", results)
    //         return res.send("Email already exists")
    //     }


    //     //add user
    //     client.query(
    //         queries.addUser,
    //         [username, password],
    //         (error, results) => {
    //             console.log("results 3 ", results)
    //             if (error)
    //                 return error;

    //             return res.status(201).send("User successfully added!")
    //         })
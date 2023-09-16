const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../models');
// const queries = require('../queries');
// const client = require('../config/db');

console.log("here")
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, done) {
        console.log("Here", email, password);
        try {
            // client.query(queries.checkEmailExists, [email], (error, results) => {
            //     console.log("resulte are 1", results)
            //     if (!results.rows.length) {
            //         console.log("resulte are ", results)
            //         return done(null, false);
            //     }
            //     // console.log(results.rows.password)
            //     let user = results.rows[0].s;
            //     console.log(user.id);
            //     client.query(queries.getPassword, [email], (error, results) => {
            //         if (error)
            //             return error;

            //         console.log("results are ", results.rows[0].password == password)
            //         if (results.rows[0].password == password) {
            //             return done(null, user);
            //         }
            //         return done(null, false);

            //     })
            // })
            let user = await User.findOne({ where: { username: email } });
            if (!user) { return done(null, false); }
            // bcrypt.compare(password, user.password).then(function (result) {
            let result = password == user.password
            console.log(result);
            if (result == false) return done(null, false);
            return done(null, user);
            // });

        }
        catch (err) {
            if (err) { return done(err); }
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findOne({ where: { id: id } });
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});

module.exports = passport
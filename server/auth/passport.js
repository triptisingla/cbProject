const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../models');

console.log("here")
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async function (username, password, done) {
        try {
            
            let user = await User.findOne({ where: { username: username } });
            if (!user) { return done(null, false); }
            // bcrypt.compare(password, user.password).then(function (result) {
            let result = password == user.password
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
    console.log("serialize ",user)
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findOne({ where: { id: id } });
        // console.log("deserialize : ",user)
        done(null, user);
    }
    catch (err) {
        done(err,false);
    }
});

module.exports = passport
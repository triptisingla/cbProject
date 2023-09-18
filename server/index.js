const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('./auth/passport');
const { User } = require('./models');
const app = express();
const PORT = 4444;
const db = require('./models');
const cors = require('cors');
const SequelizeSessionStore = require('express-session-sequelize')(session.Store);

const sessionStore = new SequelizeSessionStore({
    db: db.sequelize,
    expiration: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser('asdjbaskdadbaskdv'));

app.use(session({
    secret: 'asdjbaskdadbaskdv',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    // cookie:{
    //     path:'/'
    // }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/profile', require('./routes/profile'))
app.use('/signup', require('./routes/signup'))
app.get('/success', (req, res) => {
    console.log("in success ", req.user)
    return res.send({ loginStatus: true })
})
app.use('/login', require('./routes/login'))
app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        // res.redirect('/');
        res.send("logout done")
    });
});
app.use('/shop', require('./routes/products'))

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    })
})


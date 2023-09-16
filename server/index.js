const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('./auth/passport');
const {User} = require('./models');
const app = express();
const PORT = 4444;
const db = require('./models');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'asdjbaskdadbaskdv',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send("hii")
})
app.use('/signup',require('./routes/signup'))
app.get('/random',(req,res)=>{
    res.send("login")
})
app.use('/login',require('./routes/login'))

app.use('/products',require('./routes/products'))

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    })
})


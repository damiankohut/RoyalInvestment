const express = require('express');
const pool = require('./dbconfig');
const bcrypt = require('bcrypt');
const session = require('express-session')
const flash = require('express-flash');
const passport = require('passport')
const initializePassport = require('./passportConfig')


const port = process.env.PORT || 3000;

const app = express();
initializePassport(passport)


//MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash())
app.use(passport.session());
app.use(passport.initialize());
app.use('/public', express.static('public'));
app.use(express.json());




//ROUTES
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/users/signup', checkAuthenticated, (req, res) => {
    res.render('signup')
})

app.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login')
})
// ========================help me 
app.get('/users/game', checkNotAuthenticated, async (req, res) => {
    const portfolioData = await pool.query('SELECT tickername, buy_price FROM public.user_stocks JOIN public.user ON public.user.id = public.user_stocks.user_id WHERE public.user_stocks.user_id = $1', [req.user.id]).then(result => result.rows)
    console.log(portfolioData)
    res.render('game', {user: req.user.name, balance: req.user.account_balance, portfolio : portfolioData})
})


// =============================did this
app.get('/users/home', checkNotAuthenticated, async (req, res) => {
    const portfolioData = await pool.query('SELECT tickername, buy_price FROM public.user_stocks JOIN public.user ON public.user.id = public.user_stocks.user_id WHERE public.user_stocks.user_id = $1', [req.user.id]).then(result => result.rows)
    console.log(portfolioData)
    res.render('home', {user: req.user.name, balance: req.user.account_balance, portfolio : portfolioData})

})

app.get('/users/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "You have successfully logged out")
    res.redirect('/users/login');
})


app.post('/users/signup', async (req, res) => {
    let { name, email, password, password2} = req.body;

    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields"})
    }

    if (password !== password2) {
        errors.push({ message: "Passwords do not match"})
    }

    if (errors.length > 0) {
        res.render('signup', {errors})
    } else {
        // FORM VALIDATION PASSED

        let hashedPassword = await bcrypt.hash(password, 10);

        pool.query('SELECT * FROM public.user WHERE email = $1', [email], (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length > 0) {
                errors.push({message : "Email already registered"})
                res.render('signup', { errors })
            } else {
                pool.query('INSERT INTO public.user (name, email, password, account_balance) VALUES ($1, $2, $3, 1500) RETURNING id, password', [name, email, hashedPassword], (err, result) => {
                    if (err) {
                        throw err;
                    }

                    req.flash('success_msg', "You are now registered. Please log in")
                    res.redirect('/users/login')
                })
            }
        })
    }
})

app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/home',
    failureRedirect: '/users/login',
    failureFlash: true
}))


app.post("/users/home/buy", checkNotAuthenticated, async (req, res) => {
    const {stockName,price,quantity} = req.body;
    const userid = req.user.id
    pool.query(" INSERT INTO user_stocks (tickername, quantity_of_stocks, buy_price, sell_price, user_id) VALUES ($1, $2, $3, null, $4)", [stockName, quantity, price, userid])
    const stockbalance = req.user.account_balance
    const updatePrice = stockbalance - price * quantity
    pool.query("UPDATE public.user SET account_balance = $1 WHERE id = $2; ", [updatePrice, userid])
    res.redirect('back');
})



app.post("/users/home/game/won", checkNotAuthenticated, async (req, res) => {
    const userid = req.user.id
    const {moneyAdded} = req.body
    const stockbalance = req.user.account_balance
    const updatePrice = Number(stockbalance) + Number(moneyAdded)
    await pool.query("UPDATE public.user SET account_balance = $1 WHERE id = $2  ", [updatePrice, userid])
})

app.post("/users/home/game/lost", checkNotAuthenticated, async (req, res) => {
    const userid = req.user.id
    const {moneylost} = req.body
    const stockbalance = req.user.account_balance
    const updatePrice = Number(stockbalance) - Number(moneylost)
    await pool.query("UPDATE public.user SET account_balance = $1 WHERE id = $2  ", [updatePrice, userid])
})

app.post("/users/home/sell", checkNotAuthenticated, async (req, res) => {
    const {stockName,price,quantity} = req.body;
    const userid = req.user.id
    const stockbalance = req.user.account_balance
    const stockPrice = price;
    const updatePrice = Number(stockbalance) + Number(stockPrice) * quantity;
    pool.query("UPDATE public.user SET account_balance = $1 WHERE id = $2  ", [updatePrice, userid])
    pool.query(" DELETE FROM user_stocks WHERE public.user_stocks.tickername = $1 AND public.user_stocks.user_id = $2", [stockName, userid])
    res.redirect('back');
})





//FUNCTIONS FOR AUTH
function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/home')
    }
    next();
}

function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/users/login');
}


//SERVER
app.listen(port, () => {
    console.log('Listening to ', port);
})
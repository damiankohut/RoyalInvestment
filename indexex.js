const express = require("express")
const pool = require("./dbconfig")
const path = require('path')
const usersController = require("./controllers/usersControllers")
const { application_name } = require("pg/lib/defaults")
// const { default: knex } = require("knex")


const app = express()
app.use(express.json())

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

const PORT = 3000
// const knex = require('knex')({
//     client: 
//     user: 'postgres',
// database: 'royal_investments',
// password: 'damian',                  // If you have a postgres password, write it here
// host: 'localhost',
// port: 5432
// //ROUTES
// })
app.get("/", (req,res) => {
    res.render('loginPage.ejs')
})

// app.get("/test", async (req,res)=> {
//     const x = await pool.query(`Select * from public.user`).then(results => { return results.rows})
//     res.status(200).json(x)
// })

app.get('/loginpage', (req, res) => {
    res.render('loginPage.ejs')
})

app.get('/market', (req, res) => {
    res.render('market.ejs')
})
// app.get("/", (req,res) => {
//     // res.send("hello")
//      res.json(req.body)
// })
app.get("/home", async (req,res) => {
    // const x = await pool.query('SELECT * from public.user_stocks ').then(res => res.rows)
    // console.log(req.body)
    // knex.select().from("user").then((results) => {
const x = await pool.query(' select * from public.user ').then((results) => { console.log(results.rows)
       res.render('home.ejs', {name: results.rows})
})
    // })
 
    // res.send(x)
})

app.get('/user', usersController.getUsers)

app.get("/user/:id", usersController.getOneUser)


app.get('/signupPage', (req, res) => {
    res.render('signupPage.ejs')
})


app.get('/home', (req, res) => {
    const {email, password} = req.body;
    const checkPassword = pool.query('SELECT password FROM public.user WHERE email = $1', [email]).then(result => result.rows[0])
    // if (checkPassword !== password) {
    //     res.render('/')
    // }
    // if (!email || !password) {
    //     res.render('/')
    // } else {
        res.render('home.ejs')
    // }
})

app.post('/home', (req, res) => {
    const { stockName, price }= req.body
    const buystock =  pool.query(`INSERT INTO public.user_stocks (tickername, quantity_of_stocks, buy_price, sell_price) VALUES ($1,$2,$3,$4) returning *`,[stockName, 5, price, null] ).then(res => res.rows)
   res.status(200).json(buystock)
})


app.post('/api/user', (req,res) => {
    res.json(req.body)
    // res.send("hello")
})



app.post('/signupPage', async (req, res) => {
    const {name, email, password} = req.body
    const newUser = await pool.query('INSERT INTO public.user (name, email, password, account_balance) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, 1500]).then(result => result.rows);
    res.redirect('/')
})

app.post('/signupPage', async (req, res) => {

    res.redirect('/')
})

// app.get('/user', usersController.getUsers)

// app.get("/user/:id", usersController.getOneUser)
// app.post('/user', usersController.makeOnePerson)




// Add server listen call here
app.listen(PORT, () => {
    console.log(`List of todos server ${PORT}`)
})


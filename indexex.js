const express = require("express")
const pool = require("./dbconfig")
const path = require('path')
const usersController = require("./controllers/usersControllers")
const { application_name } = require("pg/lib/defaults")
const session = require("express-session")
const flash = require("express-flash")
const bcrypt = require("bcrypt")
// const { default: knex } = require("knex")


const app = express()
app.use(express.json())

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: 'secret',
      resave: false,
            saveUninitialized: false
    })
  );

app.use(flash())

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

app.get('/signupPage', (req, res) => {
    res.render('signupPage.ejs')
})

app.get('/loginpage', (req, res) => {
    res.render('loginPage.ejs')
})

app.get("/home", async (req,res) => {

const x = await pool.query(' select * from public.user ').then((results) => { console.log(results.rows[0])
       res.render('home.ejs', {name: results.rows[0].name})
})

app.get('/market', (req, res) => {
    res.render('market.ejs')
})
})

app.get('/user', usersController.getUsers)

app.get("/user/:id", usersController.getOneUser)





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
    let { name, email, password } = req.body;

    let errors = [];
  
    console.log({
      name,
      email,
      password,
    });
  
    if (!name || !email || !password) {
      errors.push({ message: "Please enter all fields" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Password must be a least 6 characters long" });
    }
  
    if (errors.length > 0) {
      res.render("register", { errors, name, email, password });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validation passed
      pool.query(
        `SELECT * FROM public.user
          WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            return res.render("register", {
              message: "Email already registered"
            });
          } else {
            pool.query(
                `INSERT INTO public.user (name, email, password, account_balance)
                VALUES ($1, $2, $3, 1500)
                  RETURNING id, password`,
              [name, email, hashedPassword],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/loginpage");
              }
            );
          }
        }
      );
    }
  });

app.post('/signupPage', async (req, res) => {

    res.redirect('')
})

// app.get('/user', usersController.getUsers)

// app.get("/user/:id", usersController.getOneUser)
// app.post('/user', usersController.makeOnePerson)




// Add server listen call here
app.listen(PORT, () => {
    console.log(`List of todos server ${PORT}`)
})


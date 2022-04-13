const express = require("express")
const pool = require("./dbconfig")

const usersController = require("./controllers/usersControllers")
const { application_name } = require("pg/lib/defaults")


const app = express()
app.use(express.json())
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

const PORT = 3000

app.get("/", (req,res) => {
    res.render('loginPage.ejs')
})

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

app.post('/signupPage', async (req, res) => {
    const {name, email, password} = req.body
    const newUser = await pool.query('INSERT INTO public.user (name, email, password, account_balance) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, 1500]).then(result => result.rows);
    res.redirect('/')
})

// app.get('/user', usersController.getUsers)

// app.get("/user/:id", usersController.getOneUser)
// app.post('/user', usersController.makeOnePerson)


// Add server listen call here
app.listen(PORT, () => {
    console.log("List of todos server")
})
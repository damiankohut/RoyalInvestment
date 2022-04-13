const express = require("express")
const pool = require("./dbconfig")

const usersController = require("./controllers/usersControllers")
const { application_name } = require("pg/lib/defaults")


const app = express()
app.use(express.json())
const PORT = 5500
// app.get("/", (req,res) => {
//     // res.send("hello")
//      res.json(req.body)
// })
app.get('/user', usersController.getUsers)

app.get("/user/:id", usersController.getOneUser)

app.post('/api/user', (req,res) => {
    res.json(req.body)
    // res.send("hello")
})


app.put('/todos/:id', (req, res) => {
 res.send("send todos")
})


// Add server listen call here
app.listen(PORT, () => {
    console.log(`List of todos server ${PORT}`)
})
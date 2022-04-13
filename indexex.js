const express = require("express")
const pool = require("./dbconfig")

const usersController = require("./controllers/usersControllers")
const { application_name } = require("pg/lib/defaults")


const app = express()
app.use(express.json())
const PORT = 3000
app.get("/", (req,res) => {
    res.send("hello")
})
app.get('/user', usersController.getUsers)

app.get("/user/:id", usersController.getOneUser)
app.post('/user', usersController.makeOnePerson)


app.put('/todos/:id', (req, res) => {
 res.send("send todos")
})


// Add server listen call here
app.listen(PORT, () => {
    console.log("List of todos server")
})
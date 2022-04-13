
const pool = require("../dbconfig")
const router= require('express').Router();
const {getUsers,getOneUser, makeOnePerson }= require("../controllers/usersControllers")
// const { application_name } = require("pg/lib/defaults")


router.get("/", (req,res) => {
    res.send("hello")
})
router.get('/user', getUsers)

router.get("/user/:id", getOneUser)
router.post("/user", makeOnePerson)


router.put('/todos/:id', (req, res) => {
 res.send("send todos")
})




module.exports = router;
const { query } = require("../dbconfig") 
const bcrypt = require("bcrypt")
const router = require("express").Router();

router.post("/user", async(req,res) => {
    const {name, email, password} = req.body;
    const passwordHashed = await bcrypt.hash(password)
    const sql = "insert into userarea (name, email, password, account_balance) values ($1, $2, $3, $4) returning *"
    const user = await query(sql, [name,email, password,1500]).then(result => result.rows)
    
    console.log(user);
    res.sendStatus(201);
});


module.exports =router
const { send } = require("express/lib/response");
const pool = require("../dbconfig")
// const usersModel = require("../models/usersModel")


const getUsers = async (req, res) => {
    const x = await pool.query("SELECT * FROM public.user").then(res => res.rows[0])
    res.status(200).send(x)
};

const makeOnePerson = async(req, res) => {
    const {name, email, password, account_balance } = req.body
 const y = await pool.query("INSERT INTO public.user(name, email, password, account_balance) VALUES ($1,$2,$3,$4 ) returning *;", [name, email, password, account_balance]).then(results => {return results.rows})
res.status(200).send(y)
}

const getOneUser = async (req,res) => {
    const id = req.params.id 
    const nameAndBalance = await pool.query("select * from public.user where id = $1", [id]).then(res =>{return res.rows})
    res.status(200).send(nameAndBalance)
}



module.exports = {
    getUsers,
    makeOnePerson,
    getOneUser

}
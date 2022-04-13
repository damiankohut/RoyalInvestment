const { send } = require("express/lib/response");
const pool = require("../dbconfig");

const userModel = require("../model/userModel")


const getUsers = async (req, res) => {
    const x = await pool.query("SELECT * FROM public.user").then(res => res.rows)
    res.status(200).send(x)
};

async function makeOnePerson(req, res) {
    const {name, email, password, account_balance} = req.body
    if(!name && !email && !password && !account_balance) {
         return res.status(400).json({
         message: 'The name, password, email and account_balance of the user is required'
    })
    }
    try {
    const user = await userModel.create({name:name, email:email, password:password, account_balance:account_balance})
    
    res.status(201).json({
        data: user
    })
    }catch (err) {
         res.status(201).json({
         message:err.message
     })
    }
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
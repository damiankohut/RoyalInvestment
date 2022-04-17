const pool = require('../dbconfig')


class User{
    static async find(id){
        if(!id) throw new Error(`an id is required`);
        const sql = `SELECT * FROM public.user`;
        const dbResult = await pool.query(sql, [id])
        return dbResult.rows[0]
    }
    static async create(data){
        const {name, email, password, account_balance } = data
        const sql = `INSERT INTO public.user (name, email, password, account_balance) VALUES ( $1, $2, $3, $4 ) RETURNING *`;
        const dbResult = await pool.query(sql, [name, email, password, account_balance])
        return dbResult.rows
    }
}




module.exports = User;
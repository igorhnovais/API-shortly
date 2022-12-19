import { connection } from "../database/db.js";

export async function getUsersValidation(req,res,next){

    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try{

        const session = await connection.query('SELECT * FROM sessions WHERE token=$1;',
        [token]);

        if (session.rowCount === 0){
            return res.sendStatus(401);
        }

        const idUser = session.rows[0].user_id;

        const userExist = await connection.query('SELECT * FROM users WHERE id=$1;', 
        [idUser])

        if(userExist.rowCount === 0){
            return res.sendStatus(404)
        }

        req.idUser = idUser;

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

    next()
}
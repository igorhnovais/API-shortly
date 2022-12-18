import { connection } from "../database/db.js";

export async function deleteUrlsValidation (req,res,next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try{

        const session = await connection.query('SELECT * FROM sessions WHERE token=$1',
        [token]);

        if (session.rowCount === 0){
            return res.sendStatus(401);
        }

        const url = await connection.query('SELECT sessions.token FROM Sessions WHERE token=$1', 
        [token])


    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running');
    }
}
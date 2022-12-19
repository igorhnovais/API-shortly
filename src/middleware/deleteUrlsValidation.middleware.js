import { connection } from "../database/db.js";

export async function deleteUrlsValidation (req,res,next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const {id} = req.params;

    try{

        const session = await connection.query('SELECT * FROM sessions WHERE token=$1;',
        [token]);

        if (session.rowCount === 0){
            return res.sendStatus(401);
        }

        const userInfo = await connection.query('SELECT * FROM users JOIN sessions ON users.id=sessions.user_id WHERE sessions.token=$1;', 
        [token]);

        const userInfoUrl = await connection.query('SELECT * FROM urls WHERE id=$1;', 
        [id]);
    

        if(userInfo.rows[0].id !== userInfoUrl.rows[0].user_id){
            return res.sendStatus(401);
        }

        if(userInfoUrl.rowCount === 0){
            return res.sendStatus(404);
        }

    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running');
    }

    next();
}
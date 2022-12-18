
import { connection } from "../database/db.js";

export async function getUrlsValidation(req, res, next){

    const {id} = req.params;

    try{

        const shortUrl = await connection.query('SELECT urls.short_url FROM urls WHERE id=$1;', 
        [id]);
        
        if(shortUrl.rowCount === 0){
            res.sendStatus(404);
        }

    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running');
    }

    next();
}
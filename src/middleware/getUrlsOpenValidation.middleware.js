import { connection } from "../database/db.js";

export async function getUrlsOpenValidation(req, res, next){

    const {shortUrl} = req.params;

    try{

        const short = await connection.query('SELECT urls.short_url FROM urls WHERE short_url=$1;', 
        [shortUrl]);
        
        if(short.rowCount === 0){
            res.sendStatus(404);
        }

    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running');
    }

    next();
}
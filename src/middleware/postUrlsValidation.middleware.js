import { connection } from "../database/db.js";

import { postUrlSchema } from "../models/postUrls.models.js";

export async function postUrlsValidation(req,res, next){

    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    

    const infoUser = req.body;

    try{

        const {error} = postUrlSchema.validate(infoUser, {abortEarly: false});

        if (error){
            const erros = error.details.map(detail => detail.message);
            return res.status(422).send(erros);
        }

        const session = await connection.query('SELECT * FROM sessions WHERE token=$1',
        [token]);


        if (session.rowCount === 0){
            return res.sendStatus(401);
        }

        req.token = token;

    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running2');
    }

    next();

}
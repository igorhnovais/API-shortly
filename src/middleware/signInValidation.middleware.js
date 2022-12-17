import bcrypt from 'bcrypt';

import { connection } from '../database/db.js';
import { userSignInSchema } from '../models/signIn.models.js';

export async function signInValidation(req, res, next){
    const infoUser = req.body;
    const {email, password} = req.body;

    try {
        const {error} = userSignInSchema.validate(infoUser, {abortEarly: false});

        if (error){
            const erros = error.details.map(detail => detail.message);
            return res.status(422).send(erros);
        }

        const userExists = await connection.query('SELECT * FROM users WHERE email=$1;', [email]);

        if (userExists.rowCount === 0){
            return res.sendStatus(401);
        };

        const passwordExist = await connection.query('SELECT users.password FROM users WHERE email=$1;', [email]);
        const passwordCrypted = passwordExist.rows[0].password;

        const passwordOk = bcrypt.compareSync(password, passwordCrypted);

        if (!passwordOk){
            return res.sendStatus(401);
        };

    } catch (err){
        console.log("ve erro", err.message);
        return res.status(500).send('Server not running2');
    }

    next();
    
}
import { connection } from "../database/db.js";

import { userSignUpSchema } from "../models/signUp.models.js";

export async function signUpValidation (req, res, next){
    const infoUser = req.body;

    try {
        const {error} = userSignUpSchema.validate(infoUser, {abortEarly: false});

        if (error){
            const erros = error.details.map(detail => detail.message);
            return res.status(422).send(erros);
        }

        const userExists = await connection.query('SELECT * FROM users WHERE email=$1;', [infoUser.email]);

        if (userExists.rowCount > 0){
            return res.sendStatus(409);
        };
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

    req.infoUser = infoUser;

    next();
};
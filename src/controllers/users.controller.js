import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";

import { connection } from "../database/db.js";


export async function postSignUp (req,res){
    const infoUser = req.infoUser;

    try {
        const passwordHash = bcrypt.hashSync(infoUser.password, 12);
        const hashedPassword = passwordHash;

        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', 
        [infoUser.name, infoUser.email, hashedPassword]);

        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
};

export async function postSignIn(req,res){
    const {email} = req.body;
    const token = uuid();

    try{

        const idUser = await connection.query('SELECT users.id FROM users WHERE email=$1;', [email]);

        await connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [idUser.rows[0].id, token]);
        res.sendStatus(200);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
};

export async function getUsers(req,res){

    const id = req.idUser;

    try{

    const user = await connection.query(`
        SELECT 
        users.id, users.name, sum(urls.visit_count) AS "visitCount",
        JSON_AGG(JSON_BUILD_OBJECT(
            'id', urls.id, 'shortUrl', urls.short_url,'url', urls.url, 'visitCount',urls.visit_count)
            ) AS "shortedUrls"
        FROM users
        JOIN urls
        ON urls.user_id = users.id
        WHERE users.id=$1
        GROUP BY users.id
        ;`, [id]);

    res.status(200).send(user.rows[0]);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
    
};
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
    
};
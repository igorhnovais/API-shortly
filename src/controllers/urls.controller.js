import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid'

import { connection } from "../database/db.js";

export async function postUrls(req,res){

    const token = req.token;
    const {url} = req.body;

    try{
        const idToken = await connection.query('SELECT sessions.user_id FROM sessions WHERE token=$1;', [token]);
        const idUser = idToken.rows[0].user_id; 

        const nanoid = customAlphabet('1234567890abcdef', 6)
        const shortUrl = nanoid();


        await connection.query('INSERT INTO urls (user_id, url, short_url, visit_count) VALUES ($1, $2, $3, $4);', 
        [idUser, url, shortUrl, 0])
        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running');
    }
};1

export async function getUrls(req,res){

};

export async function getUrlsOpen(req,res){

};

export async function deleteUrls(req,res){

};
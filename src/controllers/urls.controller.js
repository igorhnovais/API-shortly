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
};

export async function getUrls(req,res){

    const {id} = req.params;

    try{

        const body = await connection.query(`
        SELECT 
            urls.user_id, urls.short_url, urls.url
        FROM
            urls
        WHERE
            id=$1`, [id]);

        res.send(body.rows[0]).status(200)

    } catch (err){
        console.log(err.message);
        return res.status(500).send('Server not running');
    }
};

export async function getUrlsOpen(req,res){
    
    const {shortUrl} = req.params;

    try{

        const count = await connection.query(`SELECT visit_count FROM urls WHERE short_url=$1;`, 
        [shortUrl]);
        const newCount = Number(count.rows[0].visit_count) + 1;


        const url = await connection.query(`
            SELECT 
                 urls.url
            FROM
                urls
            WHERE
                short_url=$1;`, 
            [shortUrl]);


            await connection.query(`
            UPDATE 
                urls 
            SET 
                visit_count=$1 
            WHERE 
                short_url=$2;`,[newCount, shortUrl]);

        const urlRedirected = url.rows[0].url
        return res.redirect(urlRedirected);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
};

export async function deleteUrls(req,res){

};
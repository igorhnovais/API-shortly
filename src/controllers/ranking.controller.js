import { connection } from "../database/db.js";

export async function getRanking(req,res){

    const ranking = await connection.query(`
        SELECT us.id, us.name, 
        CASE WHEN COUNT(ur.*) = 0 THEN 0
        ELSE COUNT(ur.*) 
        END AS "linksCount", 
        CASE WHEN COUNT(ur.*) = 0 THEN 0 
        ELSE SUM(ur.visit_count) 
        END AS "visitCount" 
        FROM users AS us 
        LEFT JOIN urls AS ur 
        ON ur.user_id = us.id 
        GROUP BY us.id 
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;`
    );

    res.send(ranking.rows).status(200);
};
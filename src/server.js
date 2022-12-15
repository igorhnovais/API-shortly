import express from "express";
import cors from "cors";

import usersRouters from "./routes/users.route.js";
import urlsRouters from "./routes/urls.route.js";
import rankingRouters from "./routes/ranking.route.js";



const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRouters);
app.use(urlsRouters);
app.use(rankingRouters);


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Running in port ${port}`)
});
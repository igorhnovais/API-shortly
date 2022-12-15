import {Router} from "express";
const router = Router();

import { getRanking } from "../controllers/ranking.controller.js";

router.get("/ranking", getRanking);

export default router;
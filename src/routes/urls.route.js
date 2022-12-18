import {Router} from "express";
const router = Router();

import { postUrls, getUrls, getUrlsOpen, deleteUrls } from "../controllers/urls.controller.js";

import { postUrlsValidation } from "../middleware/postUrlsValidation.middleware.js";

router.post("/urls/shorten", postUrlsValidation, postUrls);

router.get("/urls/:id", getUrls);

router.get("/urls/open/:shortUrl", getUrlsOpen);

router.delete("/urls/:id", deleteUrls);

export default router;
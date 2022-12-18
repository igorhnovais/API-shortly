import {Router} from "express";
const router = Router();

import { postUrls, getUrls, getUrlsOpen, deleteUrls } from "../controllers/urls.controller.js";

import { postUrlsValidation } from "../middleware/postUrlsValidation.middleware.js";
import { getUrlsValidation } from "../middleware/getUrlsValidation.middleware.js";
import { getUrlsOpenValidation } from "../middleware/getUrlsOpenValidation.middleware.js";

router.post("/urls/shorten", postUrlsValidation, postUrls);

router.get("/urls/:id", getUrlsValidation, getUrls);

router.get("/urls/open/:shortUrl", getUrlsOpenValidation, getUrlsOpen);

router.delete("/urls/:id", deleteUrls);

export default router;
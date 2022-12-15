import {Router} from "express";
const router = Router();

import { postSignUp, postSignIn, getUsers } from "../controllers/users.controller.js";

router.post("/signup", postSignUp);

router.post("/signin", postSignIn);

router.get("/users/me", getUsers);

export default router;
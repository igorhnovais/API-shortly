import {Router} from "express";
const router = Router();

import { postSignUp, postSignIn, getUsers } from "../controllers/users.controller.js";

import {signUpValidation} from "../middleware/signUpvalidation.middleware.js";
import { signInValidation } from "../middleware/signInValidation.middleware.js";

router.post("/signup", signUpValidation, postSignUp);

router.post("/signin", signInValidation, postSignIn);

router.get("/users/me", getUsers);

export default router;
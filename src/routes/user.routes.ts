import { Router } from "express";
import {login, signIn, signOut  } from "../controllers/user.controller.ts"
import { authMiddleware } from "../middleware/auth.middleware.ts";


const router= Router();

router.post("/login", login);

router.post("/register", signIn);

router.post("/logout",authMiddleware ,signOut);

export default router;
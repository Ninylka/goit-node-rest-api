
import express from "express";
import validateBody from "../helpers/validateBody.js";
import auth from "../controllers/auth.js";
import {schemas} from "../schemas/usersSchemas.js"
import  authenticate  from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";


const {
    register,
    login,
    getCurrent,
    logout,
    updateAvatar,
} = auth;



const authRouter = express.Router();
authRouter.post("/register", validateBody(schemas.registerSchema), register);
authRouter.post("/login", validateBody(schemas.loginSchema), login);
authRouter.get("/current",authenticate, getCurrent);
authRouter.post("/logout",authenticate, logout);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)
export default authRouter;

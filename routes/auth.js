
import express from "express";
import validateBody from "../helpers/validateBody.js";
import auth from "../controllers/auth.js";
import {schemas} from "../schemas/usersSchemas.js"
import  authenticate  from "../helpers/authenticate.js";


const {
    register,
    login,
    getCurrent,
    logout
} = auth;



const authRouter = express.Router();
authRouter.post("/register", validateBody(schemas.registerSchema), register);
authRouter.post("/login", validateBody(schemas.loginSchema), login);
authRouter.get("/current",authenticate, getCurrent);
authRouter.post("/logout",authenticate, logout);
export default authRouter;

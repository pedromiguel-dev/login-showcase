import express from "express";
import loginController from "../../controllers/loginController";

const loginRouter = express.Router()

loginRouter.route("/login")
    .post(loginController)

export default loginRouter
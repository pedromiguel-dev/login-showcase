import express from "express";
import loginRouter from "./login";
import registerRouter from "./register";

const rootRoute = express.Router()

rootRoute.use("/", loginRouter)
rootRoute.use("/register", registerRouter)


export default rootRoute
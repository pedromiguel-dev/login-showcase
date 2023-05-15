import express from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import refreshRouter from "./api/refresh";

const rootRoute = express.Router()

rootRoute.use("/", loginRouter)
rootRoute.use("/register", registerRouter)
rootRoute.use("/refresh", refreshRouter)


export default rootRoute
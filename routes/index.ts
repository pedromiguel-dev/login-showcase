import express from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import refreshRouter from "./api/refresh";
import logoutRouter from "./api/logout";

const rootRoute = express.Router()

rootRoute.use("/", loginRouter)
rootRoute.use("/register", registerRouter)
rootRoute.use("/refresh", refreshRouter)
rootRoute.use("/logout", logoutRouter)


export default rootRoute
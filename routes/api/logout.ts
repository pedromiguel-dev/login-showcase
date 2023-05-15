import express from "express";
import logoutController from "../../controllers/logoutController";

const logoutRouter = express.Router()

logoutRouter.get("/", logoutController)

export default logoutRouter
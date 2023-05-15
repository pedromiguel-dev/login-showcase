import express from "express";
import refreshTokenController from "../../controllers/refreshTokenController";

const refreshRouter = express.Router()

refreshRouter.get("/", refreshTokenController)

export default refreshRouter
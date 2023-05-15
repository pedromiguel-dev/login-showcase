import express from "express";
import registerController from "../../controllers/registerController";
const registerRouter = express.Router()

registerRouter.route('/')
    .get(registerController.list)
    .post(registerController.register)

export default registerRouter
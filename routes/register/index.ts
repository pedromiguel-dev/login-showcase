import express from "express";
import registerController from "../../controllers/registerController";
import verifyJWT from "../../middlewares/verifyJWT";
const registerRouter = express.Router()

registerRouter.route('/')
    .get(verifyJWT, registerController.list)
    .post(registerController.register)

export default registerRouter
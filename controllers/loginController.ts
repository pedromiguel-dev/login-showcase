import express, {Request, Response, NextFunction} from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const verifyLoginCredentialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ error: "Please fill all the fields" });
    }

    //verify if the email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Please enter a valid email" });
    next();
};

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body

    const userFound = await prisma.user.findFirst({
        where: {
            email
        },
        include: {
            role: true
        }
    });
    if (!userFound) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, userFound.password)

    if (match) {
        const roles = userFound.role
        return res.json({message: `logged in ${userFound.name}`, roles })
    }
    return res.json({message: "User or password incorrect"})
}

const loginController = express.Router()

loginController.use(verifyLoginCredentialsMiddleware, handleLogin)

export default loginController
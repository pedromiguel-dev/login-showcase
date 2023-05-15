import express, {Request, Response, NextFunction} from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import {randomUUID} from "crypto";

const list = async (req: Request, res: Response, next: NextFunction) => {
    const listOfUsers = await prisma.user.findMany()

    res.status(200).json(listOfUsers)
}
const verifyRegisterCredentialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    //verify if the email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Please enter a valid email" });

    const duplicateEmailOrUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { name }],
        },
    });

    if (duplicateEmailOrUser) return res.status(400).json({ error: "Email or username already exists" });

    next();
};

const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const userRegistered = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: {
                    connect: [{ id: 2 }],
                },
            }
        });
        return res.status(201).json({message: "new user created"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: e})
    }

}

const register = express.Router()
register.use(verifyRegisterCredentialsMiddleware, handleRegister)

const registerController = {
    register,
    list
}

export default registerController
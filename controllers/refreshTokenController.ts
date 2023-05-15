import express, {Request, Response, NextFunction} from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    //if we have cookies verify the jwt
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    console.log(cookies)
    const refreshToken = cookies.jwt

    const userFound = await prisma.user.findFirst({
        where: {
            refreshToken
        },
        include: {
            role: true
        }
    });

    if(!userFound) return res.status(403).json({error: "Please login again"})

    if(!process.env.REFRESH_TOKEN_S) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_S, (err: any, decoded:any) => {

        if(err || userFound.email !== decoded.user.email) return res.status(403).json({error: "Please login again"})

        if(!process.env.ACCESS_TOKEN_S) return res.sendStatus(403);
        const accessToken = jwt.sign({user: {email: userFound.email, roles: userFound.role}}, process.env.ACCESS_TOKEN_S, {expiresIn: '10s'})

        return res.status(200).json({message: `logged in ${userFound.name}`, roles: userFound.role, accessToken })
    })
}

export default refreshTokenController
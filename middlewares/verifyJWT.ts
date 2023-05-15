import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import {NextFunction, Request, Response} from "express";
import {log} from "util";

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({message: "No token provided"})

    const token = authHeader.split(" ")[1]

    if (!process.env.ACCESS_TOKEN_S) return res.sendStatus(403);
    jwt.verify(token, process.env.ACCESS_TOKEN_S, (err: any, decoded: any) => {
        if(err) return res.status(403).json({message: "Invalid token"})
        if(!decoded) return res.status(403).json({message: "Invalid token"})

        req.user = {email: decoded.user.email, roles: decoded.user.roles}
        next()
    })
}

export default verifyJWT
import express, {Request, Response, NextFunction} from "express";
import prisma from "../prisma/client";

const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    //also delete the refresh token on frontend
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken:string = cookies.jwt

    const userFound = await prisma.user.findFirst({
        where: {
            refreshToken,
        },
    });

    if (!userFound) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204)

    }

    await prisma.user.update({
        data: {
            refreshToken: ''
        },
        where: {
            id: userFound.id
        }
    })

    res.clearCookie("jwt", { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204)
}


export default logoutController

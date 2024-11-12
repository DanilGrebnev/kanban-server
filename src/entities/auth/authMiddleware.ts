import jwt from "jsonwebtoken"
import { Responses } from "@/shared/response"
import { consts } from "@/shared/consts"
import { Request, Response } from "express"

export const authMiddleware = async (req: Request, res: Response, next) => {
    try {
        const jwtPayload = req.cookies.auth
        jwt.verify(jwtPayload, consts.JWT_SECRET)

        next()
    } catch (err) {
        res.status(401).send(Responses.message("Not authorization"))
    }
}

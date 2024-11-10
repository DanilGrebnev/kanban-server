import jwt from "jsonwebtoken"
import { Responses } from "../../shared/response.js"
import { consts } from "../../shared/consts.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const jwtPayload = req.cookies.auth
        await jwt.verify(jwtPayload, consts.JWT_SECRET)

        next()
    } catch (err) {
        res.status(404).send(Responses.message("Not authorization"))
    }
}

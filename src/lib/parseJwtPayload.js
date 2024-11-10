import jwt from "jsonwebtoken"
import { consts } from "../shared/consts.js"

export const parseJwtPayload = async (jwtPayload) => {
    try {
        return await jwt.verify(jwtPayload, consts.JWT_SECRET)
    } catch (err) {
        return
    }
}

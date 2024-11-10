import jwt from "jsonwebtoken"
import { consts } from "../shared/consts.js"

export const createAuthJwtPayload = async (userId) => {
    return await jwt.sign({ userId }, consts.JWT_SECRET)
}

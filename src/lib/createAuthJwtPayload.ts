import jwt from "jsonwebtoken"
import { consts } from "@/shared/consts"

export const createAuthJwtPayload = async (userId: string) => {
    return jwt.sign({ userId }, consts.JWT_SECRET)
}

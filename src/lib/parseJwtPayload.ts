import jwt from "jsonwebtoken"
import { consts } from "@/shared/consts"

export interface JWTPayloadDecode {
    userId: string
}

export const parseJwtPayload = (
    jwtPayload: string,
): JWTPayloadDecode | undefined => {
    try {
        return jwt.verify(jwtPayload, consts.JWT_SECRET) as JWTPayloadDecode
    } catch (err) {
        return err
    }
}

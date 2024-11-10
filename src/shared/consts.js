import "dotenv/config"

export const consts = {
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_KEY: process.env.COOKIE_KEY,
}

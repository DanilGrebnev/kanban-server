import "dotenv/config"

export const consts = {
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_KEY: process.env.COOKIE_KEY,
    PORT: Number(process.env.PORT),
    DB_URL: process.env.DB_URL,
} as const

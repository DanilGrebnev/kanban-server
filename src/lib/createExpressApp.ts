import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { consts } from "@/shared/consts.js"
import "dotenv/config"
import { Express } from "express"

interface IConnectDbOptions {
    uri: string
}

interface ICreateExpressAppArgs {
    port: number
    corsOptions: Parameters<typeof cors>[0]
}

export class CreateExpressApp {
    private readonly app: Express
    private readonly port: number

    constructor({ port, corsOptions }: ICreateExpressAppArgs) {
        this.port = port
        this.app = express()
        this.app.use(express.json()).use(cookieParser(consts.COOKIE_KEY))

        if (corsOptions) {
            this.app.use(cors(corsOptions))
        }
    }

    use = (...middleware: any[]) => {
        this.app.use(...middleware)
        return this
    }

    connectToDB = ({ uri }: IConnectDbOptions) => {
        mongoose
            .connect(uri)
            .then(() => {
                console.log("Success connect to MongoDB")
            })
            .catch((err) => {
                console.log("Error connect to MongoDB")
                console.log(err)
            })
        return this
    }

    create = (cb?: (...args: any[]) => any) => {
        try {
            this.app.listen(this.port, cb?.())
            console.log("Application start on port " + this.port)
            return this
        } catch (err) {
            console.log("error create express app")
            return this
        }
    }
}

import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { consts } from "../shared/consts.js"
import "dotenv/config"
const expressApp = express()

export class CreateExpressApp {
    constructor({ port, corsOptions }) {
        this.port = port
        this.app = expressApp
        this.app
            .use(cors(corsOptions))
            .use(express.json())
            .use(cookieParser(consts.COOKIE_KEY))
    }

    use = (...middleware) => {
        this.app.use(...middleware)
        return this
    }

    connectToMongoDB = ({ uri }) => {
        try {
            mongoose.connect(uri)
            console.log("Success connect to MongoDB")
            return this
        } catch (err) {
            console.log("Error connect to MongoDB")
            console.log(err)
            return this
        }
    }

    create = (cb) => {
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

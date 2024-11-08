import mongoose from "mongoose"
import express from "express"

const expressApp = express()

export class CreateExpressApp {
    constructor({ port }) {
        this.port = port
        this.app = expressApp
        this.app.use(express.json())
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

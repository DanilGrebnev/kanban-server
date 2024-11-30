import swaggerUi from "swagger-ui-express"
import yaml from "yaml"
import fs from "fs"
import path from "path"
import express from "express"

const router = express.Router()

const swaggerYaml = fs.readFileSync(
    path.join(__dirname, "../../../swagger/swagger.yaml"),
    "utf-8",
)
const swaggerDocument = yaml.parse(swaggerYaml)

router.get("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export const swaggerMiddleware = router

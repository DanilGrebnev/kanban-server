import { dashboardController } from "./entities/dashboards/dashboard-controller.js"
import { CreateExpressApp } from "./lib/createExpressApp.js"
import { usersController } from "./entities/users/users-controller.js"
import { columnsController } from "./entities/columns/columns-controller.js"
import { todoController } from "./entities/todos/todo-controller.js"
import { authMiddleware } from "./entities/auth/authMiddleware.js"

import "dotenv/config"

const port = 3001
const uri = "mongodb://localhost:27017/kanban"
const app = new CreateExpressApp({
    port,
    corsOptions: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
})

app.use("/users", usersController)
    .use("/dashboards", dashboardController)
    .use("/columns", columnsController)
    .use("/todos", todoController)
    .create()
    .connectToMongoDB({ uri })

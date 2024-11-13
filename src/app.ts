import "module-alias/register"
import { dashboardController } from "@/entities/dashboards"
import { CreateExpressApp } from "@/lib/createExpressApp"
import { usersController } from "@/entities/users"
import { columnsController } from "@/entities/columns"
import { todoController } from "@/entities/todos"
import { commentsController } from "@/entities/comments"

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
    .use("/comments", commentsController)
    .create()
    .connectToMongoDB({ uri })

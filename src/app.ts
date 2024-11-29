import "module-alias/register"
import { dashboardController } from "@/entities/dashboards"
import { CreateExpressApp } from "@/lib/createExpressApp"
import { usersController } from "@/entities/users"
import { columnsController } from "@/entities/columns"
import { todoController } from "@/entities/todos"
import { commentsController } from "@/entities/comments"
import { consts } from "@/shared/consts"
import "dotenv/config"

const app = new CreateExpressApp({
    port: consts.PORT || 3001,
    corsOptions: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    },
})

app.use(...usersController)
    .use(...dashboardController)
    .use(...columnsController)
    .use(...todoController)
    .use(...commentsController)
    .create()
    .connectToDB({ uri: consts.DB_URL })

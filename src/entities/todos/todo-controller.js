import { Router } from "express"
import { toDoServices } from "./todo-services.js"
import { Responses } from "../../shared/response.js"
import { parseJwtPayload } from "../../lib/parseJwtPayload.js"
import { authMiddleware } from "../auth/authMiddleware.js"

const router = Router()

/* Get todos by columnsId */
router.get("/:columnId", async (req, res) => {
    try {
        const response = await toDoServices.getTodos(req.params.columnId)
        return res.status(200).send(response)
    } catch (err) {
        return res.status(400).send(Responses.message("Ошибка получения задач"))
    }
})

/* Create todos */
router.post("/", async (req, res) => {
    try {
        const payload = await parseJwtPayload(req.cookies?.auth)

        const response = await toDoServices.createTodo({
            ...req.body,
            authorId: payload.userId,
        })

        return res.status(200).send(response)
    } catch (err) {
        return res.status(400).send(Responses.message("Ошибка создания задачи"))
    }
})

/* Перемещение задачи в другую колонку */
router.post("/move-todo", authMiddleware, async (req, res) => {
    try {
        const response = await toDoServices.moveToAnotherColumn(req.body)
        return res.status(200).send(response)
    } catch (err) {
        return res
            .status(400)
            .send(Responses.message("Ошибка перемещения задачи"))
    }
})

router.delete("/", authMiddleware, async (req, res) => {
    try {
        const response = await toDoServices.deleteTodo(req.body.todoId)
        return res.status(200).send(response)
    } catch (err) {
        return res.status(400).send(Responses.message("Ошибка удаления задачи"))
    }
})

export const todoController = router

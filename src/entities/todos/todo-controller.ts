import { Router, Response } from "express"
import { toDoServices } from "./todo-services.js"
import { Responses } from "@/shared/response.js"
import { parseJwtPayload } from "@/lib/parseJwtPayload.js"
import { authMiddleware } from "../auth/authMiddleware.js"
import { ReqType } from "@/shared/types"
import {
    ICreateTodoDTO,
    IMoveTodoDTO,
    IDeleteTodoDTO,
} from "@/entities/todos/todo-schema"

const router = Router()

/* Get todos by columnsId */
router.get(
    "/:columnId",
    async (
        req: ReqType<{ pathParams: "columnId" }>,
        res: Response,
    ): Promise<any> => {
        try {
            const response = await toDoServices.getTodos(req.params.columnId)
            return res.status(200).send(response)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка получения задач"))
        }
    },
)

router.get(
    "/detail/:todoId",
    async (
        req: ReqType<{ pathParams: "todoId" }>,
        res: Response,
    ): Promise<any> => {
        try {
            const todo = await toDoServices.getTodoDetail(req.params.todoId)
            return res.status(200).send(todo)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка получения задачи"))
        }
    },
)

/* Create todos */
router.post(
    "/",
    authMiddleware,
    async (
        req: ReqType<{ body: ICreateTodoDTO }>,
        res: Response,
    ): Promise<any> => {
        try {
            const payload = parseJwtPayload(req.cookies?.auth)

            const response = await toDoServices.createTodo({
                ...req.body,
                authorId: payload.userId,
            })

            return res.status(200).send(response)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка создания задачи"))
        }
    },
)

/* Перемещение задачи в другую колонку */
router.post(
    "/move-todo",
    authMiddleware,
    async (
        req: ReqType<{ body: IMoveTodoDTO }>,
        res: Response,
    ): Promise<any> => {
        try {
            const response = await toDoServices.moveToAnotherColumn(req.body)
            return res.status(200).send(response)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка перемещения задачи"))
        }
    },
)

/* Delete todos */
router.delete(
    "/",
    authMiddleware,
    async (
        req: ReqType<{ body: IDeleteTodoDTO }>,
        res: Response,
    ): Promise<any> => {
        try {
            const response = await toDoServices.deleteTodo(req.body.todoId)
            return res.status(200).send(response)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка удаления задачи"))
        }
    },
)

export const todoController = router

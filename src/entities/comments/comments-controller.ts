import { Router } from "express"
import { ReqType } from "@/shared/types"
import {
    ICreateCommentsDTO,
    IUpdateCommentsDTO,
} from "@/entities/comments/comments-schema"
import { commentsServices } from "@/entities/comments/comments-services"
import { Responses } from "@/shared/response"
import { authMiddleware } from "@/entities/auth/authMiddleware"
import { parseJwtPayload } from "@/lib/parseJwtPayload"
import { toDoServices } from "@/entities/todos"

const router = Router()

router.post(
    "/",
    authMiddleware,
    async (
        req: ReqType<{ body: ICreateCommentsDTO; cookies: "auth" }>,
        res,
    ): Promise<any> => {
        try {
            const payload = parseJwtPayload(req.cookies.auth)

            const p1 = commentsServices.createComments({
                ...req.body,
                authorId: payload.userId,
            })
            const p2 = toDoServices.updateCommentsAmount(
                req.body.todoId,
                "increment",
            )
            const [comment] = await Promise.all([p1, p2])

            return res.status(200).send(comment)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка создания комментария", err.message),
            )
        }
    },
)

router.get(
    "/:todoId",
    async (req: ReqType<{ pathParams: "todoId" }>, res): Promise<any> => {
        try {
            const comments = await commentsServices.getCommentsByTodoId(
                req.params.todoId,
            )
            return res.status(200).send(comments)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка получения постов", err.message),
            )
        }
    },
)

router.patch(
    "/:commentId",
    authMiddleware,
    async (
        req: ReqType<{ body: IUpdateCommentsDTO; pathParams: "commentId" }>,
        res,
    ): Promise<any> => {
        try {
            const response = await commentsServices.updateComment({
                text: req.body.text,
                commentId: req.params.commentId,
            })

            return res.status(200).send(response)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка изменения комментария", err.message),
            )
        }
    },
)

router.delete(
    "/:commentId",
    authMiddleware,
    async (
        req: ReqType<{ pathParams: "commentId"; cookies: "auth" }>,
        res,
    ): Promise<any> => {
        try {
            const comment = await commentsServices.deleteComments(
                req.params.commentId,
            )
            toDoServices.updateCommentsAmount(comment.todoId, "decrement")

            return res.status(200).send(comment)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка удаления комментария", err.message),
            )
        }
    },
)

router.get(
    "/detail/:commentsId",
    async (req: ReqType<{ pathParams: "commentsId" }>, res): Promise<any> => {
        try {
            const comment = await commentsServices.getCommentsDetail(
                req.params.commentsId,
            )
            return res.status(200).send(comment)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка получения комментария", err.message),
            )
        }
    },
)

export const commentsController = ["/comments", router]

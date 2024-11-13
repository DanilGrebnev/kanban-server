import { Router } from "express"
import { ReqType } from "@/shared/types"
import {
    ICreateCommentsDTO,
    IUpdateCommentsDTO,
} from "@/entities/comments/comments-schema"
import { commentsServices } from "@/entities/comments/comments-services"
import { Responses } from "@/shared/response"
import { authMiddleware } from "@/entities/auth/authMiddleware"

export const commentsController = Router()

commentsController.get(
    "/:todoId",
    async (req: ReqType<{ pathParams: "todoId" }>, res): Promise<any> => {
        try {
            const comments = await commentsServices.getComments(
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

commentsController.post(
    "/",
    authMiddleware,
    async (req: ReqType<{ body: ICreateCommentsDTO }>, res): Promise<any> => {
        try {
            const comment = await commentsServices.createComments(req.body)
            return res.status(200).send(comment)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка создания комментария", err.message),
            )
        }
    },
)

commentsController.patch(
    "/:commentId",
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

commentsController.delete(
    "/:commentsId",
    async (req: ReqType<{ pathParams: "commentsId" }>, res): Promise<any> => {
        try {
            const comment = await commentsServices.deleteComments(
                req.params.commentsId,
            )
            return res.status(200).send(comment)
        } catch (err) {
            res.status(400).send(
                Responses.message("Ошибка удаления комментария", err.message),
            )
        }
    },
)

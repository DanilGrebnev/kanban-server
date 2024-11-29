import { Router } from "express"
import { columnsServices } from "./columns-services.js"
import { Responses } from "@/shared/response"
import { authMiddleware } from "../auth/authMiddleware.js"
import { ReqType } from "@/shared/types"
import {
    ICreateColumnsDTO,
    IDeleteColumnsDTO,
} from "@/entities/columns/columns-schema"

const router = Router()

/* Получение колонок по id доски */
router.get(
    "/:dashboardId",
    async (req: ReqType<{ pathParams: "dashboardId" }>, res): Promise<any> => {
        try {
            const columns = await columnsServices.getColumnsList(
                req.params.dashboardId,
            )
            return res.status(200).send(columns)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка получения колонок"))
        }
    },
)

/* Создание колонки */
router.post(
    "/",
    authMiddleware,
    async (req: ReqType<{ body: ICreateColumnsDTO }>, res): Promise<any> => {
        try {
            const column = await columnsServices.createColumn(req.body)
            return res.status(200).send(column)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка создания колонки"))
        }
    },
)

/* Удаление задачи */
router.delete(
    "/",
    authMiddleware,
    async (req: ReqType<{ body: IDeleteColumnsDTO }>, res) => {
        try {
            const deletedColumn = await columnsServices.deleteColumn(
                req.body.columnId,
            )

            res.status(200).send(deletedColumn)
        } catch (err) {
            res.status(400).send(Responses.message("Ошибка удаления колонки"))
        }
    },
)

export const columnsController = ["/columns", router]

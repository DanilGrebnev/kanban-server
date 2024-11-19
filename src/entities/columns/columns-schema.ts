import { Schema, model } from "mongoose"
import { toDoServices } from "@/entities/todos"

interface IColumnsSchema {
    dashboardId: string
    columnName: string
}

const ColumnsSchema = new Schema<IColumnsSchema>(
    {
        /* Id доски, к которой принадлежит колонка */
        dashboardId: String,
        columnName: String,
    },
    {
        versionKey: false,
    },
)

ColumnsSchema.pre("deleteOne", async function (next) {
    try {
        const columnId = this.getQuery()._id
        await toDoServices.deleteAllTodo(columnId)
        next()
    } catch (err) {
        next(err)
    }
})

export const ColumnsModel = model("Columns", ColumnsSchema)

export interface ICreateColumnsDTO {
    dashboardId: string
    columnName: string
}

export interface IDeleteColumnsDTO {
    columnId: string
}

import { Schema, model } from "mongoose"

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

export const ColumnsModel = model("Columns", ColumnsSchema)

export interface ICreateColumnsDTO {
    dashboardId: string
    columnName: string
}

export interface IDeleteColumnsDTO {
    columnId: string
}

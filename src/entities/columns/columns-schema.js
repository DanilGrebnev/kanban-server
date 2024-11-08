import { Schema, model } from "mongoose"

const ColumnsSchema = new Schema(
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

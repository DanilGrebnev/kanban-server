import { Schema, model } from "mongoose"
import { ITodoSchema } from "./model/todoTypes"

const ToDoSchema = new Schema<ITodoSchema>(
    {
        /* Заголовок задачи */
        todo: String,
        description: { type: String, default: "" },
        columnId: String,
        creationDate: {
            type: Date,
            default: Date.now(),
        },
        priority: {
            type: String,
            default: "low",
        },
        author: String,
        history: {
            type: [
                {
                    authorName: String,
                    changeDate: { type: Date, default: Date.now },
                    authorId: String,
                },
            ],
            default: [],
        },
    },
    {
        versionKey: false,
    },
)

export const ToDoModel = model("ToDo", ToDoSchema)

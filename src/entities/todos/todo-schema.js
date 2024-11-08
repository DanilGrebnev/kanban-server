import { Schema, model } from "mongoose"

const ToDoSchema = new Schema(
    {
        /* Заголовок задачи */
        todo: String,
        description: { type: String, default: "" },
        columnId: String,
        creationDate: {
            type: Date,
            default: Date.now(),
        },
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

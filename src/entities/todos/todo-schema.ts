import { Schema, model } from "mongoose"

interface IToDoSchema {
    todo: string
    description: string
    columnId: string
    creationDate: Date
    priority: "low" | "middle" | "high"
    author: string
    commentsAmount: number
    history: {
        authorName: string
        changeDate: Date
        authorId: string
    }[]
}

const ToDoSchema = new Schema<IToDoSchema>(
    {
        /* Заголовок задачи */
        todo: String,
        description: { type: String, default: "" },
        columnId: String,
        commentsAmount: {
            type: Number,
            default: 0,
        },
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

export type ICreateTodoDTO = Pick<
    IToDoSchema,
    "todo" | "description" | "columnId"
>

export interface IMoveTodoDTO {
    todoId: string
    columnId: string
}

export interface IDeleteTodoDTO {
    todoId: string
}

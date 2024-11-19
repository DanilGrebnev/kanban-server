import { Schema, model } from "mongoose"
import { commentsServices } from "@/entities/comments"

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

/* Удаление всех комментариев отнсящихся к задаче при удалении 1 задачи */
ToDoSchema.pre("deleteOne", async function (next) {
    try {
        const todoId = this.getQuery()._id
        await commentsServices.deleteCommentsByTodoId(todoId)
        return next()
    } catch (err) {
        next(err)
    }
})

/* Удаление всех комментариев при удалении списка задач */
ToDoSchema.pre("deleteMany", async function (next) {
    try {
        const { columnId } = this.getFilter() as { columnId: string }
        await commentsServices.deleteCommentsByColumnId(columnId)
        return next()
    } catch (err) {
        next(err)
    }
})

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

import { Schema, model } from "mongoose"

interface ICommentsSchema {
    /* Задача, к которой принадлежит комментарий */
    todoId: string
    authorName: string
    replyTo: string
    authorId: string
    text: string
    createdDate: Date
}

const CommentsSchema = new Schema<ICommentsSchema>(
    {
        todoId: String,
        authorId: String,
        text: String,
        createdDate: {
            type: Date,
            default: Date.now,
        },
        authorName: String,
        replyTo: {
            type: String,
            default: null,
        },
    },
    { versionKey: false },
)

export const CommentsModel = model("Comments", CommentsSchema)

export interface ICreateCommentsDTO {
    todoId: string
    replyTo: string
    authorName: string
    text: string
}

export interface IUpdateCommentsDTO {
    text: string
}

import { Schema, model } from "mongoose"

interface ICommentsSchema {
    /* Задача, к которой принадлежит комментарий */
    todoId: string
    authorName: string
    replyTo: string
    authorId: string
    text: string
    replyInfo: {
        authorName: string
        authorId: string
        date: Date
    }
    createdDate: Date
}

type IReplyInfoSchema = ICommentsSchema["replyInfo"]

const replySchema = new Schema<IReplyInfoSchema>({
    authorName: String,
    authorId: String,
    date: {
        type: Date,
        default: Date.now,
    },
})

const CommentsSchema = new Schema<ICommentsSchema>(
    {
        todoId: String,
        authorId: String,
        text: String,
        replyInfo: {
            type: replySchema,
            default: null,
        },
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
    authorId: string
    authorName: string
    text: string
    replyInfo: {
        authorName: string
        authorId: string
    } | null
}

export interface IUpdateCommentsDTO {
    text: string
}

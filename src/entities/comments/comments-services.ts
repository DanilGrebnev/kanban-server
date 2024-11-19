import {
    CommentsModel,
    type ICreateCommentsDTO,
    IUpdateCommentsDTO,
} from "./comments-schema"
import { ToDoModel } from "@/entities/todos"

export class CommentsServices {
    getComments = async (todoId: string) => {
        return CommentsModel.find({ todoId })
    }

    createComments = async (data: ICreateCommentsDTO) => {
        const todo = await ToDoModel.findById(data.todoId)
        if (!todo) {
            throw new Error("Ошибка создания комментария")
        }

        const newComment = new CommentsModel({
            ...data,
            columnId: todo.columnId,
        })

        return newComment.save()
    }

    deleteComments = async (commentId: string) => {
        return CommentsModel.findOneAndDelete({ _id: commentId })
    }

    deleteCommentsByColumnId = async (columnId: string) => {
        return CommentsModel.deleteMany({ columnId })
    }

    deleteCommentsByTodoId = async (todoId: string) => {
        return CommentsModel.deleteMany({ todoId }).exec()
    }

    updateComment = async ({
        text,
        commentId,
    }: IUpdateCommentsDTO & { commentId: string }) => {
        return CommentsModel.findByIdAndUpdate(
            commentId,
            { text },
            { new: true },
        )
    }
}

export const commentsServices = new CommentsServices()

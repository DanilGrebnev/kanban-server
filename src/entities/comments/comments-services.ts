import {
    CommentsModel,
    type ICreateCommentsDTO,
    IUpdateCommentsDTO,
} from "./comments-schema"

export class CommentsServices {
    getComments = async (todoId: string) => {
        return CommentsModel.find({ todoId })
    }

    createComments = async (data: ICreateCommentsDTO) => {
        const newComment = new CommentsModel(data)

        return newComment.save()
    }

    deleteComments = async (commentId: string) => {
        return CommentsModel.findByIdAndDelete(commentId)
    }

    deleteAllComments = async (todoId: string) => {
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

import { ICreateTodoDTO, IMoveTodoDTO, ToDoModel } from "./todo-schema"
import { UsersModel } from "@/entities/users"

class ToDoServices {
    createTodo = async (data: ICreateTodoDTO & { authorId: string }) => {
        const { authorId, ...otherData } = data
        const user = await UsersModel.findById(authorId).exec()
        const todo = new ToDoModel(otherData)
        todo.author = user.name
        return await todo.save()
    }

    getTodos = async (columnId: string) => {
        return ToDoModel.find({ columnId }).sort({ _id: -1 })
    }

    getTodoDetail = async (todoId: string) => {
        return ToDoModel.findById(todoId)
    }

    deleteTodo = async (todoId: string) => {
        return ToDoModel.findByIdAndDelete({ _id: todoId })
    }

    moveToAnotherColumn = async ({ columnId, todoId }: IMoveTodoDTO) => {
        return ToDoModel.findByIdAndUpdate(todoId, { columnId })
    }
}

export const toDoServices = new ToDoServices()

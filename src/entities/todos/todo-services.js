import { ToDoModel } from "./todo-schema.js"
import { UsersModel } from "../users/users-schema.js"

class ToDoServices {
    createTodo = async (data) => {
        const { authorId, ...otherData } = data

        const user = await UsersModel.findById(authorId).exec()

        const todo = new ToDoModel(otherData)
        todo.author = user.name

        return await todo.save()
    }

    getTodos = async (columnId) => {
        return ToDoModel.find({ columnId })
    }

    getTodoDetail = async (todoId) => {
        return await ToDoModel.findById(todoId)
    }

    deleteTodo = async (todoId) => {
        return await ToDoModel.findByIdAndDelete({ _id: todoId })
    }

    moveToAnotherColumn = async ({ columnId, todoId }) => {
        return await ToDoModel.findByIdAndUpdate(todoId, { columnId })
    }
}

export const toDoServices = new ToDoServices()

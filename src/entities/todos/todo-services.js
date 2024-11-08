import { ToDoModel } from "./todo-schema.js"

class ToDoServices {
    createTodo = async (data) => {
        const todo = new ToDoModel(data)
        return await todo.save()
    }

    getTodos = async (columnId) => {
        return ToDoModel.find({ columnId })
    }

    deleteTodo = async (todoId) => {
        return await ToDoModel.findByIdAndDelete({ _id: todoId })
    }

    moveToAnotherColumn = async ({ columnId, todoId }) => {
        return await ToDoModel.findByIdAndUpdate(todoId, { columnId })
    }
}

export const toDoServices = new ToDoServices()

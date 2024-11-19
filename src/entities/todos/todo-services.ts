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

    updateCommentsAmount = async (
        todoId: string,
        action: "increment" | "decrement",
    ) => {
        const todo = await ToDoModel.findById(todoId)
        if (!todo) throw new Error("Задачи не существует")

        switch (action) {
            case "increment":
                todo.commentsAmount += 1
                break
            case "decrement":
                todo.commentsAmount -= 1
        }

        return await todo.save()
    }

    deleteTodo = async (todoId: string) => {
        // const deletedTodo = await ToDoModel.deleteOne({ _id: todoId })
        const deletedTodo = await ToDoModel.deleteOne({ _id: todoId })
        return deletedTodo
    }

    /* Удаление всех todo по идентификатору колонки */
    deleteAllTodo = async (columnId: string) => {
        return ToDoModel.deleteMany({ columnId })
    }

    moveToAnotherColumn = async ({ columnId, todoId }: IMoveTodoDTO) => {
        return ToDoModel.findByIdAndUpdate(todoId, { columnId })
    }
}

export const toDoServices = new ToDoServices()

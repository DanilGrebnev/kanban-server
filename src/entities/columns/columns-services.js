import { ColumnsModel } from "./columns-schema.js"
import { ToDoModel } from "../todos/todo-schema.js"

class ColumnsServices {
    /* Получение всех колонок доски */
    getColumnsList = async (dashboardId) => {
        return await ColumnsModel.find({ dashboardId }).exec()
    }

    createColumn = async (data) => {
        const column = new ColumnsModel(data)
        return await column.save()
    }

    deleteColumn = async (columnId) => {
        const promiseDeletedTodo = ToDoModel.deleteMany({ columnId })
        const promiseDeletedColumn = ColumnsModel.findByIdAndDelete(columnId)

        const [deletedColumn] = await Promise.all([
            promiseDeletedColumn,
            promiseDeletedTodo,
        ])
        return deletedColumn
    }
}

export const columnsServices = new ColumnsServices()

import { ColumnsModel, ICreateColumnsDTO } from "./columns-schema"
import { ToDoModel } from "@/entities/todos"

class ColumnsServices {
    /* Получение всех колонок доски */
    getColumnsList = async (dashboardId: string) => {
        return await ColumnsModel.find({ dashboardId }).exec()
    }

    createColumn = async (data: ICreateColumnsDTO) => {
        const column = new ColumnsModel(data)
        return await column.save()
    }

    deleteColumn = async (columnId: string) => {
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

import { ColumnsModel } from "./columns-schema.js"

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
        return await ColumnsModel.findByIdAndDelete({ _id: columnId })
    }
}

export const columnsServices = new ColumnsServices()

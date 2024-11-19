import { ColumnsModel, ICreateColumnsDTO } from "./columns-schema"

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
        const deletedColumn = await ColumnsModel.deleteOne({ _id: columnId })

        return deletedColumn
    }
}

export const columnsServices = new ColumnsServices()

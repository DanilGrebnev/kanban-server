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

    deleteColumnsByDashboardId = async (dashboardId: string) => {
        const columns = await ColumnsModel.find({ dashboardId })
        const pList = columns.map((column) =>
            ColumnsModel.deleteOne({ _id: column._id }),
        )

        return await Promise.all(pList)
    }
}

export const columnsServices = new ColumnsServices()

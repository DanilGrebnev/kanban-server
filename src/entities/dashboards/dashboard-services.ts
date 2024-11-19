import { DashboardModel, ICreateDashboardDTO } from "./dashboard-schema.js"
import { userServices, UsersModel, UsersRole } from "@/entities/users"
import { columnsServices } from "@/entities/columns"

class DashboardServices {
    getDashboardsList = async (userId: string) => {
        return DashboardModel.find({ participants: { $in: userId } })
    }

    createDashboard = async (
        data: ICreateDashboardDTO & { userId: string },
    ) => {
        const dashboard = new DashboardModel()

        dashboard.dashboardName = data.dashboardName
        dashboard.participants.push(data.userId)

        const [fondedUser, createdDashboard] = await Promise.all([
            UsersModel.findById(data.userId).exec(),
            dashboard.save(),
        ])

        if (!fondedUser) {
            DashboardModel.findByIdAndDelete(createdDashboard._id)
            throw new Error("Пользователь не найден")
        }

        fondedUser.dashboardsList.push({
            dashboardId: createdDashboard._id.toString(),
            dashboardName: createdDashboard.dashboardName,
            role: UsersRole.OWNER,
        })
        await fondedUser.save()

        return createdDashboard
    }

    getDashboardDetail = async (dashboardId: string) => {
        return await DashboardModel.findById(dashboardId).exec()
    }

    deleteDashboard = async (dashboardId: string) => {
        const usersInDashboard =
            await userServices.getDashboardParticipants(dashboardId)

        const deleteColumnsPromise =
            columnsServices.deleteColumnsByDashboardId(dashboardId)

        const deleteUserFromDashboardPromise = usersInDashboard.map((user) => {
            return userServices.deleteFromDashboard({
                dashboardId,
                userId: user._id as any as string,
            })
        })

        await Promise.all([
            ...deleteUserFromDashboardPromise,
            deleteColumnsPromise,
        ])

        return DashboardModel.findByIdAndDelete(dashboardId)
    }
}

export const dashboardServices = new DashboardServices()

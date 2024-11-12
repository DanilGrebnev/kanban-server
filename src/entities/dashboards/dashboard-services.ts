import { DashboardModel } from "./dashboard-schema.js"
import { UsersModel, UsersRole } from "@/entities/users"
import { ICreateDashboard } from "@/entities/dashboards/model/dashboardTypes"

class DashboardServices {
    getDashboardsList = async (userId: string) => {
        return DashboardModel.find({ participants: { $in: userId } })
    }

    createDashboard = async (data: ICreateDashboard) => {
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
}

export const dashboardServices = new DashboardServices()

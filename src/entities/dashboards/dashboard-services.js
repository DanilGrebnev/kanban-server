import { DashboardModel } from "./dashboard-schema.js"
import { UsersModel } from "../users/users-schema.js"
import { usersRole } from "../users/model/usersRole.js"

class DashboardServices {
    getDashboardsList = async () => {
        return await DashboardModel.find()
    }

    createDashboard = async (body) => {
        const dashboard = new DashboardModel()
        dashboard.dashboardName = body.dashboardName
        dashboard.participants.push(body.userId)

        const [fondedUser, createdDashboard] = await Promise.all([
            UsersModel.findById(body.userId).exec(),
            dashboard.save(),
        ])

        if (!fondedUser) {
            DashboardModel.findByIdAndDelete(createdDashboard._id)
            throw new Error("Пользователь не найден")
        }

        fondedUser.dashboardsList.push({
            dashboardId: createdDashboard._id,
            dashboardName: createdDashboard.dashboardName,
            role: usersRole.owner,
        })
        await fondedUser.save()

        return createdDashboard
    }

    getDashboardDetail = async (dashboardId) => {
        return await DashboardModel.findById(dashboardId).exec()
    }
}

export const dashboardServices = new DashboardServices()

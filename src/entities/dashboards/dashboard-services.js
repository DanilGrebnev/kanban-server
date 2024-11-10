import { DashboardModel } from "./dashboard-schema.js"
import { UsersModel } from "../users/users-schema.js"
import { usersRole } from "../users/model/usersRole.js"

class DashboardServices {
    getDashboardsList = async (userId) => {
        console.log(userId)
        return await DashboardModel.find({ participants: { $in: userId } })
    }

    createDashboard = async (data) => {
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

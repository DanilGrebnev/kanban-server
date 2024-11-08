import { DashboardModel } from "./dashboard-schema.js"
import { UsersModel } from "../users/users-schema.js"

class DashboardServices {
    getDashboardsList = async () => {
        return await DashboardModel.find()
    }

    createDashboard = async (body) => {
        const dashboard = new DashboardModel()
        dashboard.dashboardName = body.dashboardName
        dashboard.ownersId.push(body.ownerId)

        const [fondedUser, createdDashboard] = await Promise.all([
            UsersModel.findById(body.ownerId).exec(),
            dashboard.save(),
        ])

        fondedUser.dashboardsIdList.push(createdDashboard._id)
        await fondedUser.save()

        return createdDashboard
    }

    getDashboardDetail = async (dashboardId) => {
        return await DashboardModel.findById(dashboardId).exec()
    }
}

export const dashboardServices = new DashboardServices()

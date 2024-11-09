import { UsersModel } from "./users-schema.js"
import { DashboardModel } from "../dashboards/dashboard-schema.js"
import { usersRole } from "./model/usersRole.js"

class UserServices {
    create = async (body) => {
        const user = new UsersModel(body)
        return await user.save()
    }

    /* Присоединить пользователя к доске */
    joinToDashboard = async ({ dashboardId, userId }) => {
        const [user, dashboard] = Promise.all([
            UsersModel.findById(userId),
            DashboardModel.findById(dashboardId),
        ])

        if (!user) {
            throw new Error("Пользователь не найден или не существует.")
        }

        user.dashboardsList.push({
            dashboardId,
            dashboardName: dashboard.dashboardName,
            role: usersRole.employee,
        })

        // Добавляем в доску id приглашённого
        dashboard.participants.push(userId)
        dashboard.save()

        return await user.save()
    }

    deleteFromDashboard = async ({ dashboardId, userId }) => {
        const [user, dashboard] = await Promise.all([
            UsersModel.findById(userId),
            DashboardModel.findById(dashboardId),
        ])

        if (!user) {
            throw new Error("Пользователь не найден или не существует.")
        }
        if (dashboard) {
            throw new Error("Доска не найдена или не существует.")
        }

        /* Удаляем доску у пользователя */
        user.dashboardsList = user.dashboardsList.filter(
            (dashboardItem) => dashboardItem.dashboardId !== dashboardId,
        )

        /* Удаляем пользователя из участников доски */
        dashboard.participants = dashboard.participants.filter(
            (participantsId) => participantsId !== userId,
        )

        const [updatedUser] = Promise.all([user.save(), dashboard.save()])

        return updatedUser
    }

    login = async (body) => {
        const user = await UsersModel.findOne(body).exec()
        if (!user) {
            throw new Error("Ошибка авторизации")
        }
        return user
    }
}

export const userServices = new UserServices()

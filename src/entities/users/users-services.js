import { UsersModel } from "./users-schema.js"

class UserServices {
    create = async (body) => {
        const user = new UsersModel(body)
        return await user.save()
    }

    /* Присоединить пользователя к доске */
    joinToDashboard = async ({ dashboardId, userId }) => {
        const user = await UsersModel.findOne({ _id: userId }).exec()
        if (!user) {
            throw new Error("Пользователь не найден или не существует.")
        }
        user.dashboardsIdList.push(dashboardId)
        return await user.save()
    }
    deleteFromDashboard = async (data) => {
        const user = await UsersModel.findOne({ _id: data.userId }).exec()
        if (!user) {
            throw new Error("Пользователь не найден или не существует.")
        }

        user.dashboardsIdList = user.dashboardsIdList.filter(
            (dashboardId) => dashboardId !== data.dashboardId,
        )
        return await user.save()
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

import { UsersModel } from "./users-schema.js"
import { DashboardModel } from "../dashboards/dashboard-schema.js"
import { usersRole } from "./model/usersRole.js"
import { asyncBcryptHash } from "../../lib/asyncBcryptHash.js"
import { asyncBcryptCompare } from "../../lib/asyncBcryptCompare.js"
import jwt from "jsonwebtoken"
import { consts } from "../../shared/consts.js"
import { parseJwtPayload } from "../../lib/parseJwtPayload.js"

class UserServices {
    create = async (body) => {
        const hashPassword = await asyncBcryptHash({
            payload: body.password,
            salt: 7,
        })

        const user = new UsersModel({ ...body, password: hashPassword })

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
        const user = await UsersModel.findOne({ login: body.login }).exec()

        if (!user) {
            throw new Error("Неправильный логин или пароль")
        }

        const comparePassword = await asyncBcryptCompare({
            payload: body.password,
            hash: user.password,
        })

        if (!comparePassword) {
            throw new Error("Неправильный логин или пароль")
        }
        const jwtId = await jwt.sign(
            { userId: user._id.toString() },
            consts.JWT_SECRET,
        )

        return jwtId
    }

    getProfile = async (authData) => {
        if (!authData) throw new Error("Ошибка получения профиля")
        const jwtPayload = await parseJwtPayload(authData)

        const user = await UsersModel.findById(jwtPayload.userId)
        if (!user) throw new Error("Пользователь не найден")
        return user
    }
}

export const userServices = new UserServices()

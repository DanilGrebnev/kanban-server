import { UsersModel } from "./users-schema.js"
import { DashboardModel } from "../dashboards/dashboard-schema.js"
import { usersRole } from "./model/usersRole.js"
import { asyncBcryptHash } from "../../lib/asyncBcryptHash.js"
import { asyncBcryptCompare } from "../../lib/asyncBcryptCompare.js"
import { parseJwtPayload } from "../../lib/parseJwtPayload.js"
import { createAuthJwtPayload } from "../../lib/createAuthJwtPayload.js"

class UserServices {
    create = async (data) => {
        const fondedUserByNamePromise = UsersModel.findOne({ name: data.name })
        const fondedUserByLoginPromise = UsersModel.findOne({
            login: data.login,
        })
        const [fondedUserByName, fondedUserByLogin] = await Promise.all([
            fondedUserByNamePromise,
            fondedUserByLoginPromise,
        ])

        if (fondedUserByName) throw new Error("Имя пользователя уже занято")
        if (fondedUserByLogin) throw new Error("Логин уже занят")

        const hashPassword = await asyncBcryptHash({
            payload: data.password,
            salt: 7,
        })

        const user = new UsersModel({ ...data, password: hashPassword })

        return await user.save()
    }

    findUser = async (userName) => {
        const nameRegex = new RegExp(userName)

        if (!userName) return []

        return await UsersModel.find({
            name: { $regex: nameRegex, $options: "i" },
        })
    }

    /* Присоединить пользователя к доске */
    joinToDashboard = async ({ dashboardId, userId }) => {
        const [user, dashboard] = await Promise.all([
            UsersModel.findById(userId),
            DashboardModel.findById(dashboardId),
        ])

        if (!user) {
            throw new Error("Пользователь не существует.")
        }
        if (!dashboard) {
            throw new Error("Доска не найдена")
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
        if (!dashboard) {
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

        const [updatedUser] = await Promise.all([user.save(), dashboard.save()])

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

        const jwtId = await createAuthJwtPayload(user._id.toString())

        return jwtId
    }

    getProfile = async (authData) => {
        if (!authData) throw new Error("Ошибка получения профиля")
        const jwtPayload = await parseJwtPayload(authData)

        const user = await UsersModel.findById(jwtPayload.userId)
        if (!user) throw new Error("Пользователь не найден")
        return user
    }

    getDashboardParticipants = async (dsahboardId) => {
        return await UsersModel.find({
            "dashboardsList.dashboardId": dsahboardId,
        })
    }
}

export const userServices = new UserServices()

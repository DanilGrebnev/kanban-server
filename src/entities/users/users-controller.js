import { Router } from "express"
import { userServices } from "./users-services.js"
import { Responses } from "../../shared/response.js"
import { createAuthJwtPayload } from "../../lib/createAuthJwtPayload.js"
import { authMiddleware } from "../auth/authMiddleware.js"

const router = Router()

router.post("/registration", async (req, res) => {
    try {
        const user = await userServices.create(req.body)

        const jwtUserId = await createAuthJwtPayload(user._id.toString())

        return res
            .cookie("auth", jwtUserId, {
                httpOnly: true,
            })
            .status(200)
            .send(Responses.message("Регистрация успешна", user))
    } catch (err) {
        return res
            .status(400)
            .send(Responses.message(`Ошибка регистрации. ${err?.message}`))
    }
})

router.get("/search", async (req, res) => {
    try {
        const fondedUsers = await userServices.findUser(req.query.name)

        return res.status(200).send(fondedUsers)
    } catch (err) {
        return res
            .status(400)
            .send(
                Responses.message("Ошибка полиска пользователя", err?.message),
            )
    }
})

router.post("/join", async (req, res) => {
    try {
        const response = await userServices.joinToDashboard(req.body)
        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        return res.send(
            Responses.message(`Ошибка добавления пользователя в доску, ${err}`),
        )
    }
})

router.get("/participants/:dashboardId", async (req, res) => {
    try {
        const users = await userServices.getDashboardParticipants(
            req.params.dashboardId,
        )

        res.send(users)
    } catch (err) {
        res.send({ err })
    }
})

router.post("/login", async (req, res) => {
    try {
        const jwtUserId = await userServices.login(req.body)

        return res
            .cookie("auth", jwtUserId, {
                httpOnly: true,
            })
            .status(200)
            .send(Responses.message("Авторизация успешна"))
    } catch (err) {
        console.log(err)
        return res.status(401).send(Responses.message(err?.message))
    }
})

router.delete("/remove-from-dashboard", authMiddleware, async (req, res) => {
    try {
        const response = await userServices.deleteFromDashboard(req.body)
        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .send(
                Responses.message(
                    `Ошибка удаления пользователя из доски, ${err?.message}`,
                ),
            )
    }
})

router.get("/profile", async (req, res) => {
    try {
        const user = await userServices.getProfile(req.cookies.auth)
        return res.status(200).send(user)
    } catch (err) {
        res.status(401).send(Responses.message(err))
    }
})

export const usersController = router

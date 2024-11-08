import { Router } from "express"
import { userServices } from "./users-services.js"
import { Responses } from "../../shared/response.js"

const router = Router()

router.post("/registration", async (req, res) => {
    try {
        const user = await userServices.create(req.body)
        return res.status(200).send(user)
    } catch (err) {}
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

router.post("/login", async (req, res) => {
    try {
        const response = await userServices.login(req.body)
        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        return res.send(Responses.message(`Ошибка авторизации`))
    }
})

router.post("/remove", async (req, res) => {
    try {
        const response = await userServices.deleteFromDashboard(req.body)
        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        return res.send(
            Responses.message(`Ошибка удаления пользователя из доски, ${err}`),
        )
    }
})

export const usersController = router

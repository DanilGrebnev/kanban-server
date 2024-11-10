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

router.delete("/remove", async (req, res) => {
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

router.get("/profile", async (req, res) => {
    try {
        const user = await userServices.getProfile(req.cookies.auth)
        return res.status(200).send(user)
    } catch (err) {
        res.status(401).send(Responses.message(err))
    }
})

export const usersController = router

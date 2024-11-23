import { Router, Response } from "express"
import { userServices } from "./users-services.js"
import { Responses } from "@/shared/response.js"
import { createAuthJwtPayload } from "@/lib/createAuthJwtPayload.js"
import { authMiddleware } from "../auth/authMiddleware.js"
import { ReqType } from "@/shared/types"
import {
    ICreateUserDTO,
    IFindUserDTO,
    IJoinUserToDashboardDTO,
    ILoginUserDTO,
    IRemoveUserFromDashboardDTO,
} from "@/entities/users/users-schema"

const router = Router()

router.post(
    "/registration",
    async (req: ReqType<{ body: ICreateUserDTO }>, res): Promise<any> => {
        try {
            const user = await userServices.create(req.body)

            const jwtUserId = await createAuthJwtPayload(user._id.toString())

            return res
                .cookie("auth", jwtUserId, {
                    httpOnly: true,
                    maxAge: Number(process.env.COOKIE_MAX_AGE),
                })
                .status(200)
                .send(Responses.message("Регистрация успешна", user))
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message(`Ошибка регистрации. ${err?.message}`))
        }
    },
)

router.get(
    "/search",
    async (
        req: ReqType<{ queryParams: IFindUserDTO }>,
        res: Response,
    ): Promise<any> => {
        try {
            const fondedUsers = await userServices.findUser(req.query.name)

            return res.status(200).send(fondedUsers)
        } catch (err) {
            return res
                .status(400)
                .send(
                    Responses.message(
                        "Ошибка полиска пользователя",
                        err?.message,
                    ),
                )
        }
    },
)

router.post(
    "/join",
    async (
        req: ReqType<{ body: IJoinUserToDashboardDTO }>,
        res,
    ): Promise<any> => {
        try {
            const response = await userServices.joinToDashboard(req.body)
            return res.status(200).send(response)
        } catch (err) {
            console.log(err)
            return res.send(
                Responses.message(
                    `Ошибка добавления пользователя в доску, ${err}`,
                ),
            )
        }
    },
)

router.get(
    "/participants/:dashboardId",
    async (req: ReqType<{ pathParams: "dashboardId" }>, res): Promise<any> => {
        try {
            const users = await userServices.getDashboardParticipants(
                req.params.dashboardId,
            )

            return res.status(200).send(users)
        } catch (err) {
            return res.send({ err })
        }
    },
)

router.post(
    "/login",
    async (req: ReqType<{ body: ILoginUserDTO }>, res): Promise<any> => {
        try {
            const jwtUserId = await userServices.login(req.body)

            return res
                .cookie("auth", jwtUserId, {
                    httpOnly: true,
                    maxAge: Number(process.env.COOKIE_MAX_AGE),
                })
                .status(200)
                .send(Responses.message("Авторизация успешна"))
        } catch (err) {
            console.log(err)
            return res.status(401).send(Responses.message(err?.message))
        }
    },
)

router.delete(
    "/remove-from-dashboard",
    authMiddleware,
    async (
        req: ReqType<{ body: IRemoveUserFromDashboardDTO }>,
        res,
    ): Promise<any> => {
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
    },
)

router.get("/profile", async (req, res) => {
    try {
        const user = await userServices.getProfile(req.cookies.auth)
        res.status(200).send(user)
    } catch (err) {
        res.status(401).send(Responses.message(err))
    }
})

export const usersController = router

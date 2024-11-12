import { Router, Request, Response } from "express"
import { dashboardServices } from "./dashboard-services.js"
import { Responses } from "@/shared/response.js"
import { JWTPayloadDecode, parseJwtPayload } from "@/lib/parseJwtPayload.js"
import { authMiddleware } from "@/entities/auth/authMiddleware.js"

const router = Router()

/* Get dashboards list */
router.get(
    "/",
    authMiddleware,
    async (req: Request, res: Response): Promise<any> => {
        try {
            if (!req.cookies.auth) {
                return res.status(401).send(Responses.NotAuthorization)
            }
            const payload = parseJwtPayload(req.cookies.auth)

            const response = await dashboardServices.getDashboardsList(
                (<JWTPayloadDecode>payload).userId,
            )

            return res.send(response)
        } catch (err) {
            return res
                .status(400)
                .send(Responses.message("Ошибка получения досок"))
        }
    },
)

router.get(
    "/:dashboardId",
    authMiddleware,
    async (req: Request, res: Response): Promise<any> => {
        try {
            const dashboard = await dashboardServices.getDashboardDetail(
                req.params.dashboardId,
            )
            return res.send(dashboard)
        } catch (err) {
            return res.send(Responses.message("Ошибка получения доски"))
        }
    },
)

/* Create dashboard */
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.cookies.auth) {
            return res.status(401).send(Responses.NotAuthorization)
        }

        const payload = parseJwtPayload(req.cookies.auth)

        const response = await dashboardServices.createDashboard({
            dashboardName: req.body.dashboardName,
            userId: (<JWTPayloadDecode>payload).userId,
        })

        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(400).send(Responses.message("Ошибка создания доски"))
    }
})

export const dashboardController = router

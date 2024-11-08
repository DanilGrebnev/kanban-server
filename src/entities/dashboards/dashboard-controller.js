import { Router } from "express"
import { dashboardServices } from "./dashboard-services.js"
import { Responses } from "../../shared/response.js"

const router = Router()

/* Get dashboards list */
router.get("/", async (req, res) => {
    try {
        const response = await dashboardServices.getDashboardsList()

        return res.send(response)
    } catch (err) {
        return res.status(400).send(Responses.message("Ошибка получения досок"))
    }
})

router.get("/:dashboardId", async (req, res) => {
    try {
        const dashboard = await dashboardServices.getDashboardDetail(
            req.params.dashboardId,
        )
        return res.send(dashboard)
    } catch (err) {
        return res.send(Responses.message("Ошибка получения доски"))
    }
})

/* Create dashboard */
router.post("/", async (req, res) => {
    try {
        const response = await dashboardServices.createDashboard(req.body)
        return res.send(response)
    } catch (err) {
        res.status(400).send(Responses.message("Ошибка создания доски"))
    }
})

export const dashboardController = router

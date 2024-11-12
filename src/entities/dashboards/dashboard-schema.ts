import { Schema, model } from "mongoose"

const DashboardsSchema = new Schema(
    {
        dashboardName: String,
        participants: { type: [String], default: [] },
    },
    {
        versionKey: false,
    },
)

export const DashboardModel = model("Dashboards", DashboardsSchema)

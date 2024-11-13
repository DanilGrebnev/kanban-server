import { Schema, model } from "mongoose"

interface IDashboardsSchema {
    dashboardName: string
    participants: string[]
}

const DashboardsSchema = new Schema<IDashboardsSchema>(
    {
        dashboardName: String,
        participants: { type: [String], default: [] },
    },
    {
        versionKey: false,
    },
)

export const DashboardModel = model("Dashboards", DashboardsSchema)

export interface ICreateDashboardDTO {
    dashboardName: string
}

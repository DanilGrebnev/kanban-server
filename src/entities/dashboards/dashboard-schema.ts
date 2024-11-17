import { Schema, model } from "mongoose"

interface IDashboardsSchema {
    dashboardName: string
    participants: string[]
    createdDate: Date
}

const DashboardsSchema = new Schema<IDashboardsSchema>(
    {
        dashboardName: String,
        createdDate: {
            type: Date,
            default: Date.now(),
        },
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

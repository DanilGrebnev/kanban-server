import { Schema, model } from "mongoose"

const UserRole = "owner" || "employee"

const UsersSchema = new Schema(
    {
        name: String,
        password: String,
        login: String,
        dashboardsList: {
            type: [
                { dashboardId: String, dashboardName: String, role: String },
            ],
            default: [],
        },
    },
    {
        versionKey: false,
    },
)

export const UsersModel = model("Users", UsersSchema)

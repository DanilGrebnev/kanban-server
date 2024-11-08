import { Schema, model } from "mongoose"

const UsersSchema = new Schema(
    {
        name: String,
        password: String,
        login: String,
        dashboardsIdList: {
            type: [String],
            default: [],
        },
        role: {
            type: String,
            default: "employee",
        },
    },
    {
        versionKey: false,
    },
)

export const UsersModel = model("Users", UsersSchema)

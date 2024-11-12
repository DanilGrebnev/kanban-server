import { Schema, model } from "mongoose"
import { IProfile } from "@/entities/users/model/usersTypes"

const UsersSchema = new Schema<IProfile>(
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

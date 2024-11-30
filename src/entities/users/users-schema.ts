import { Schema, model } from "mongoose"

interface IUsersSchema {
    name: string
    password: string
    login: string
    dashboardsList: {
        dashboardId: string
        dashboardName: string
        role: UsersRole.OWNER | UsersRole.EMPLOYEE
    }[]
}

export enum UsersRole {
    OWNER = "owner",
    EMPLOYEE = "employee",
}

const UsersSchema = new Schema<IUsersSchema>(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
        },
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

export type ICreateUserDTO = Pick<IUsersSchema, "login" | "name" | "password">
export type ILoginUserDTO = Pick<ICreateUserDTO, "login" | "password">

export type IRemoveUserFromDashboardDTO = {
    userId: string
    dashboardId: string
}

export type IJoinUserToDashboardDTO = {
    userId: string
    dashboardId: string
}
export type IGetDashboardParticipantsDTO = string
export type IFindUserDTO = { name: string }

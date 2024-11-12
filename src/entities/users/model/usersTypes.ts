export enum UsersRole {
    OWNER = "owner",
    EMPLOYEE = "employee",
}

export interface ILogin {
    login: string
    password: string
}

export interface IRegister extends ILogin {
    name: string
}

export interface IProfile {
    _id: string
    password: string
    login: string
    name: string
    dashboardsList: {
        dashboardId: string
        dashboardName: string
        role: UsersRole.EMPLOYEE | UsersRole.OWNER
    }[]
}

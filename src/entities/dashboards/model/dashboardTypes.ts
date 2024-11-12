export interface IDashboard {
    _id: string
    participants: string[]
    dashboardName: string
}

export interface ICreateDashboard {
    dashboardName: string
    userId: string
}

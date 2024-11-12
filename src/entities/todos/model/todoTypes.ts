export interface ITodoSchema {
    todo: string
    description: string
    columnId: string
    creationDate: Date
    priority: "low" | "middle" | "high"
    author: string
    history: { authorName: string; changeDate: string; authorId: string }[]
}

export type TodoDTO = Omit<ITodoSchema, "creationDate" | "history">

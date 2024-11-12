class Response {
    createResponse = (status: number, message: string) => {
        return { status, message }
    }

    message(message: string, data?: Record<string, any> | string | number) {
        if (data) {
            return { message, data }
        }
        return { message }
    }

    NotAuthorization = this.createResponse(401, "Not authorized")
}

export const Responses = new Response()

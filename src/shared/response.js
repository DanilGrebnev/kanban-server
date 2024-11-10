class Response {
    createResponse = (status, message) => {
        return { status, message }
    }

    message(message, data) {
        if (data) {
            return { message, data }
        }
        return { message }
    }

    NotAuthorization = this.createResponse(401, "Not authorized")
}

export const Responses = new Response()

import bcrypt from "bcryptjs"

export const asyncBcryptCompare = (data: any) =>
    new Promise((resolve, reject) => {
        bcrypt.compare(data.payload, data.hash, (err, res) => {
            if (err) return reject(err)
            return resolve(res)
        })
    })

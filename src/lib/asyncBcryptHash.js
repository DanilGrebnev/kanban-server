import bcrypt from "bcryptjs"

/*
 * @params - payload: данные для хеширования
 * @params - salt - сложность
 * */
export const asyncBcryptHash = (data) =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(data.salt, (err, salt) => {
            bcrypt.hash(data.payload, salt, function (err, hash) {
                if (err) return reject(err)
                return resolve(hash)
            })
        })
    })

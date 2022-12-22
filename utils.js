import bcrypt from "bcrypt";

const isValidPassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword)
}

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export {
    isValidPassword,
    encryptPassword
}
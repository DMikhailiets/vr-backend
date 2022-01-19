const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const generateJWT = (entity) => {
    return jwt.sign(
        {
            id: entity.id,
            userType: entity.userTypeId
        }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRED
        }
    )
}

module.exports = generateJWT
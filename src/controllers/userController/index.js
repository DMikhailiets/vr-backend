const { authenticate } = require('../../core')
const UserController = require('./userController')

const userControllerRouter = (content, params) => {
    try {
        const userController = authenticate(new UserController(content.entity, params), content, params)
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = userControllerRouter
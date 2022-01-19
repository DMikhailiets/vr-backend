const { authenticate } = require('../../core')
const UserTypeController = require('./userTypeController')

const userTypeRouter = (content, params) => {
    try {
        const userTypeController = authenticate(new UserTypeController(content.entity, params), content, params)
        switch (content.method) {
            case 'create': {
                return userTypeController.create(content)
            }
            case 'update': {
                return userTypeController.update(content)
            }
            case 'delete': {
                return userTypeController.delete(content)
            }
            case 'getOne': {
                return userTypeController.getById(content)
            }
            case 'getAll': {
                return userTypeController.getAll()
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = userTypeRouter
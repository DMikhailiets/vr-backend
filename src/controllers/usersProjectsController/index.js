const { authenticate } = require('../../core')
const UsersProjectsController = require('./usersProjectsController')

const usersProjectsRouter = (content, params) => {
    try {
        const usersProjectsController = authenticate(new UsersProjectsController(content.entity, params), content, params)
        switch (content.method) {
            case 'create': {
                return usersProjectsController.create(content)
            }
            case 'update': {
                return usersProjectsController.update(content)
            }
            case 'delete': {
                return usersProjectsController.delete(content)
            }
            case 'getOne': {
                return usersProjectsController.getById(content)
            }
            case 'getAll': {
                return usersProjectsController.getAll(content)
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = usersProjectsRouter
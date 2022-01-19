const { authenticate } = require('../../core')
const ProjectController = require('./projectController')

const projectControllerRouter = (content, params) => {
    try {
        const projectController = authenticate(new ProjectController(content.entity, params), content, params)
        switch (content.method) {
            case 'create': {
                return projectController.create(content)
            }
            case 'update': {
                return projectController.update(content)
            }
            case 'delete': {
                return projectController.delete(content)
            }
            case 'getOne': {
                return projectController.getById(content)
            }
            case 'getAll': {
                return projectController.getAllForOwnershipProperty(content)
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = projectControllerRouter
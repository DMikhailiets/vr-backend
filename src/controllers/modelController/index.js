const { authenticate } = require('../../core')
const ModelController = require('./modelController')

const modelControllerRouter = (content, params) => {
    try {
        const modelController = authenticate(new ModelController(content.entity, params), content, params)
        switch (content.method) {
            case 'create': {
                return modelController.create(content)
            }
            case 'update': {
                return modelController.update(content)
            }
            case 'delete': {
                return modelController.delete(content)
            }
            case 'getOne': {
                return modelController.getById(content)
            }
            case 'getAll': {
                return modelController.getAllForOwnershipProperty(content)
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = modelControllerRouter
const getParamsByEntityName = require('../../utils/getParamsByEntityName')
const commonController = require('./commonController')

const commonControllerRouter = (content, params) => {
    const meta = getParamsByEntityName(content.entity)
    switch (content.method) {
        case 'create': {
            return commonController.create(content, {...params, ...meta})
        }
        case 'update': {
            return commonController.update(content, {...params, ...meta})
        }
        case 'delete': {
            return commonController.delete(content, {...params, ...meta})
        }
        case 'getOne': {
            return commonController.getById(content, {...params, ...meta})
        }
        case 'getAll': {
            return commonController.getAll(content, {...params, ...meta})
        }
        default: return
    }
}
module.exports = commonControllerRouter
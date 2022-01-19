const { authenticate } = require('../../core')
const RulesController = require('./rulesController')

const rulesControllerRouter = async (content, params) => {
    try {
        const { reload } = params
        const rulesController = authenticate(new RulesController(content.entity, params), content, params)
        switch (content.method) {
            case 'create': {
                await rulesController.create(content)
                return await reload()
            }
            case 'updateEntity': {
                await rulesController.update(content)
                return await reload()
            }
            case 'getOne': {
                rulesController.getById(content)
                return await reload()
            }
            case 'getAll': {
                await rulesController.getAll(content)
                return await reload()
            }
            case 'delete': {
                await rulesController.delete(content)
                return await reload()
            }
            case 'updateField': {
                await rulesController.patch(content)
                return await reload()
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = rulesControllerRouter
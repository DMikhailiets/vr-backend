const { authenticate } = require('../../core')
const SubscriptionController = require('./subscriptionController')

const subscriptionControllerRouter = (content, params) => {
    try {
        const subscriptionController = authenticate(new SubscriptionController(content.entity, params), content, params)
        switch (content.method) {
            case 'create': {
                return subscriptionController.create(content)
            }
            case 'update': {
                return subscriptionController.update(content)
            }
            case 'delete': {
                return subscriptionController.delete(content)
            }
            case 'getOne': {
                return subscriptionController.getById(content)
            }
            case 'getAll': {
                return subscriptionController.getAll()
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = subscriptionControllerRouter
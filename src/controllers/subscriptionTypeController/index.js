const SubscriptionTypeController = require('./subscriptionTypeController')
const { authenticate } = require('../../core')

const subscriptionTypeControllerRouter = (content, params) => {
    try {
        const subscriptionTypeController = authenticate(new SubscriptionTypeController(content.entity, params), content, params)
        //const subscriptionTypeController = new EntityClass(content.entity, params)
        switch (content.method) {
            case 'create': {
                return subscriptionTypeController.create(content)
            }
            case 'update': {
                return subscriptionTypeController.update(content)
            }
            case 'delete': {
                return subscriptionTypeController.delete(content)
            }
            case 'getOne': {
                return subscriptionTypeController.getById(content)
            }
            case 'getAll': {
                return subscriptionTypeController.getAll()
            }
            default: return
        }
    } catch(err) {
        console.error(err.message)
    }
}
module.exports = subscriptionTypeControllerRouter
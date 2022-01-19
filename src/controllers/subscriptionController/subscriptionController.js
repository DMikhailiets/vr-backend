const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')

dotenv.config()

class SubscriptionController extends CommonController {
}

module.exports = SubscriptionController
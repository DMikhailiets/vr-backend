const { SubscriptionType } = require('../../database/models')
const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')

dotenv.config()

class SubscriptionTypeController extends CommonController {
}

module.exports = SubscriptionTypeController
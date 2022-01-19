const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')

dotenv.config()

class ModelController extends CommonController {
}

module.exports = ModelController
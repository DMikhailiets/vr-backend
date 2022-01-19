const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')

dotenv.config()

class UserController extends CommonController {
}

module.exports = UserController
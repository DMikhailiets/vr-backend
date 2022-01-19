const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')

dotenv.config()

class RulesController extends CommonController {
    async create (content) {
        try {
            const { properties, modelName } = this.params
            const data =  content.args
            const entityModel = await CommonController.getModel(modelName)
            const duplicate = await entityModel.findOne({ where: { userTypeId: data.userTypeId, entity: data.entity }})
            if (!duplicate) {
                const newEntity = await CommonController.getObjectForNewModel(properties, data)
                let response = await entityModel.create(newEntity)
                console.log(newEntity)
                return await gatewayApi.sendResponseMessage(this.params, {...response.get({plain: true})})
            } else {
                return await gatewayApi.sendResponseError(this.params, {status: 409, message: 'Rule already exist'})
            }
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
}

module.exports = RulesController
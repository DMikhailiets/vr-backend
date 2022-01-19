const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')

dotenv.config()

class ProjectController extends CommonController {
    async create (content) {
        try {
            const userId = content.requestUserId
            const { properties, modelName } = this.params
            const data = content.args
            const projectModel = await CommonController.getModel(modelName)
            const newProject = await CommonController.getObjectForNewModel(properties, data)
            const { managerId } = data
            newProject.managerId = managerId || userId
            let response = await projectModel.create(newProject)
            return await gatewayApi.sendResponseMessage(this.params, { ...response.get({plain: true})})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
}

module.exports = ProjectController
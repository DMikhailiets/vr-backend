const dotenv = require('dotenv')
const CommonController = require('../commonController/commonController')
const { gatewayApi } = require('../../queueApi')
const { Project, Models } = require('../../database/models')

dotenv.config()

class UsersProjectsController extends CommonController {
    async create (content) {
        try {
            const { properties, modelName } = this.params
            const data = content.args
            const { userId, projectId } = data
            const entityModel = await CommonController.getModel(modelName)
            const newEntity = await CommonController.getObjectForNewModel(properties, data)
            const duplicate = await entityModel.findOne({ where: {
                userId, projectId
            }})
            if (duplicate) {
                return await gatewayApi.sendResponseError(this.params, {status: 409, message: 'already exist'})
            }
            let response = await entityModel.create(newEntity)
            return await gatewayApi.sendResponseMessage(this.params, {...response.get({plain: true})})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        } 
    }
    async getAll (content) {
        const userId = content.requestUserId
        const { modelName } = this.params
        const entityModel = await CommonController.getModel(modelName)
        try {
            const response = await entityModel.findAll({ where: {userId}})
            const rawResponse = response.map(el => el.get({plain: true}))
            const extendedResponse = []
            for (let el in rawResponse) {
                const project = await Project.findOne({where: { id: rawResponse[el].projectId }, include: Models})
                extendedResponse.push({
                    ...rawResponse[el],
                    project
                })
            }
            return await gatewayApi.sendResponseMessage(this.params, extendedResponse)
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 404, message: err.message})
        }
    }
}

module.exports = UsersProjectsController
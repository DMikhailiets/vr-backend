const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const CommonController = require('../commonController/commonController')
const {User} = require('../../database/models')

dotenv.config()

class IssueController extends CommonController {
    async create (content) {
        try {
            const { properties, modelName } = this.params
            const { requestUserId } = content
            const data =  content.args
            const entityModel = await CommonController.getModel(modelName)
            const newEntity = await CommonController.getObjectForNewModel(properties, {requestUserId, ...data})
            let response = await entityModel.create(newEntity)
            return await gatewayApi.sendResponseMessage(this.params, {...response.get({plain: true})})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
    async getAllForOwnershipProperty (content) {
        try {
            const { modelName, ownershipProperty } = this.params
            const ownershipPropertyId = content[ownershipProperty.requestProperty]
            const entityModel = await CommonController.getModel(modelName)
            const response = await entityModel.findAll({ where: {
                [ownershipProperty.targetProperty]: ownershipPropertyId
                }
            })
            const rawResponse = response.map(el => el.get({plain: true}))
            const extendedResponse = []
            for (let el in rawResponse) {
                const requestUser = await User.findOne({where: {id: rawResponse[el].requestUserId}})
                const executor = await User.findOne({where: {id: rawResponse[el].executorId}})
                extendedResponse.push({
                    ...rawResponse[el],
                    requestUser: {
                        username: requestUser.username,
                        email: requestUser.email,
                        id: requestUser.id
                    },
                    executor: response.executprId ? {
                        username: executor.username,
                        email: executor.email,
                        id: executor.id
                    } : null
                })
            }    
            return await gatewayApi.sendResponseMessage(this.params, extendedResponse)
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 404, message: err.message})
        }
    }
    async getAll () {
        const { modelName, include } = this.params
        const includesModels = await CommonController.getModels(include)
        const entityModel = await CommonController.getModel(modelName) // or this.constructor.getModel()
        try {
            const response = await entityModel.findAll({ include: [...includesModels]})    
            const rawResponse = response.map(el => el.get({plain: true}))
            const extendedResponse = []
            for (let el in rawResponse) {
                const requestUser = await User.findOne({where: {id: rawResponse[el].requestUserId}})
                const executor = await User.findOne({where: {id: rawResponse[el].executorId}})
                extendedResponse.push({
                    ...rawResponse[el],
                    requestUser: {
                        username: requestUser.username,
                        email: requestUser.email,
                        id: requestUser.id
                    },
                    executor: response.executprId ? {
                        username: executor.username,
                        email: executor.email,
                        id: executor.id
                    } : null
                })
            }    
            return await gatewayApi.sendResponseMessage(this.params, extendedResponse)
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 404, message: err.message})
        }
    }
}

module.exports = IssueController
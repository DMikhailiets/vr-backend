const dotenv = require('dotenv')
const { gatewayApi } = require('../../queueApi')
const getParamsByEntityName = require('../../utils/getParamsByEntityName')

dotenv.config()

class CommonController  {
    constructor (entityName, params) {
        this.params = {...getParamsByEntityName(entityName), ...params}
    }
    async create (content) {
        try {
            const { properties, modelName } = this.params
            const data =  content.args
            const entityModel = await CommonController.getModel(modelName)
            const newEntity = await CommonController.getObjectForNewModel(properties, data)
            let response = await entityModel.create(newEntity)
            return await gatewayApi.sendResponseMessage(this.params, {...response.get({plain: true})})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
    async delete (content) {
        try {
            const id = content.pathVars.entityId
            const { modelName } = this.params
            const entityModel = await CommonController.getModel(modelName)
            await entityModel.destroy({ where: {id} })
            return await gatewayApi.sendResponseMessage(this.params, { message: 'deleted'})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
    async patch (content) {
        try {
            const  id = content.pathVars.entityId
            const { properties, modelName } = this.params
            const newValues =  content.args
            const entityModel = await CommonController.getModel(modelName)
            const entity = await entityModel.findOne({ where: { id }})
            if (!entity) {
                return await gatewayApi.sendResponseError(this.params, {status: 404, message: `${content.entity} does not exist`})
            }
            const updatedEntity = await CommonController.getUpdatedEntity(properties, newValues, entity)
            const response = await entity.update(updatedEntity)
            return await gatewayApi.sendResponseMessage(this.params, {...response.get({plain: true})})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
    async update (content) {
        try {
            const  id = content.pathVars.entityId
            const { properties, modelName, unchangableProperties } = this.params
            const checkedProperties = CommonController.removeUnchangableProperties(properties, unchangableProperties)
            const newValues =  content.args
            const entityModel = await CommonController.getModel(modelName)
            const entity = await entityModel.findOne({ where: { id }})
            if (!entity) {
                return await gatewayApi.sendResponseError(this.params, {status: 404, message: `${content.entity} does not exist`})
            }
            const updatedEntity = await CommonController.getUpdatedEntity(checkedProperties, newValues, entity)
            const response = await entity.update(updatedEntity)
            return await gatewayApi.sendResponseMessage(this.params, {...response.get({plain: true})})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
    async getById (content) {
        try {
            const { modelName, include } = this.params
            const includesModels = await CommonController.getModels(include)
            const entityModel = await CommonController.getModel(modelName)
            if (content.pathVars) {
                const id = content.pathVars.entityId
                const entity = await entityModel.findOne({ where: {id}, include: [...includesModels]})
                if (entity) {
                    const rowEntity = entity.get({  plain: true})
                    return await gatewayApi.sendResponseMessage(this.params, { ...rowEntity })
                } else {
                    return await gatewayApi.sendResponseError(this.params, {status: 404, message: `${content.entity} not found`})
                }
            }
            const response = await entityModel.findAll({ include: [...includesModels]})
            return await gatewayApi.sendResponseMessage(this.params, response)
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
            return await gatewayApi.sendResponseMessage(this.params, response)
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 404, message: err.message})
        }
    }
    async getAllForOwnershipProperty (content) {
        try {
            const { modelName, include, ownershipProperty } = this.params
            let includesModels = await CommonController.getModels(include)
            const ownershipPropertyId = content[ownershipProperty.requestProperty]
            const entityModel = await CommonController.getModel(modelName)
            const response = await entityModel.findAll({ where: {
                [ownershipProperty.targetProperty]: ownershipPropertyId
            },
            include: [...includesModels],
        })
            return await gatewayApi.sendResponseMessage(this.params, response)
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 404, message: err.message})
        }
    }
    static async getModels (modelName) {
        const models = await import('../../database/models/index.js')
        if (modelName && 'length'in modelName) {
            const includesModels = []
            for (let name of modelName) { 
                includesModels.push(models.default[name])
            }
            return includesModels
        }
        return []
    }
    static async getModel (modelName) {
        const models = await import('../../database/models/index.js')
        return models.default[modelName]
    }
    static async getObjectForNewModel  (properties, data) {
        const newEntity = {}
        properties.forEach(property => {
            newEntity[property.name] = data[property.alias || property.name]
        })
        return newEntity
    }
    static async getUpdatedEntity (properties, data, entity) {
        const updatedEntity = {...entity.get({plain: true})}
        properties.forEach(property => {
            updatedEntity[property.name] = data[property.alias || property.name]
        })
        return updatedEntity
    }
    static removeUnchangableProperties (properties, unchangableProperties) {
        if (unchangableProperties) {
            return properties.filter(property => !unchangableProperties.includes(property.name))
        }
        return properties
    }
}
module.exports = CommonController
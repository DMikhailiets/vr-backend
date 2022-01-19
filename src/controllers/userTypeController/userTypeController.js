const { UserType, User } = require('../../database/models')
const dotenv = require('dotenv')
const CommonController = require('../commonController/commonController')
const { gatewayApi } = require('../../queueApi')

dotenv.config()

class UserTypeController extends CommonController {
    async delete (content) {
        try {
            const id = content.pathVars.entityId
            const targetUsertypeUsers = await User.findAll({where: {userTypeId : id}})
            if (targetUsertypeUsers.length) {
                return await gatewayApi.sendResponseError(this.params, {status: 403, message: 'There are users with this userType'})
            }
            await UserType.destroy({ where: {id} })
            return await gatewayApi.sendResponseMessage(this.params, { message: 'deleted'})
        } catch (err) {
            return await gatewayApi.sendResponseError(this.params, {status: 406, message: err.message})
        }
    }
}

module.exports = UserTypeController
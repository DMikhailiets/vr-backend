const { gatewayApi } = require("../queueApi")

const authenticate = (entityClass, content, params) => {
    const { method, userType, entity } = content
    const { authRules } = params.config
    const rule = authRules.find(rule => rule.userTypeId === userType && rule.entity === entity)
    if (rule && check(rule, entityClass, method)) {
        return entityClass
    }
    gatewayApi.sendResponseError(params, {status: 403, message: 'Forbidden'})
    throw new Error('Authentication failed')
}

const check = (rule, entityClass, method) => {
    const { authMethods } = entityClass.params
    try {
        for (let prop in authMethods) {
            if ((authMethods[prop].includes(method) || authMethods.hasOwnProperty(method)) && rule[prop] ) {
                return true
            }
        }
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}

module.exports = authenticate
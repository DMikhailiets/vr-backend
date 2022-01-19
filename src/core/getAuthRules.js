const { Rules } = require('../database/models')

const getAuthRoles = async () => {
    try {
        return await Rules.findAll({raw: true})
    } catch (err) {
        console.error("Error in AuthorisationRules receiving", err)
    }
}

module.exports = getAuthRoles
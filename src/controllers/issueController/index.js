const { authenticate } = require('../../core')
const IssueController = require('./issueController')

const issueRouter = async (content, params) => {
    try {
        const issueController = new IssueController(content.entity, params)
        switch (content.method) {
            case 'create': {
                return issueController.create(content)
            }
            case 'update': {
                return issueController.update(content)
            }
            case 'delete': {
                return issueController.delete(content)
            }
            case 'getOne': {
                return issueController.getById(content)
            }
            case 'getAll': {
                return issueController.getAllForOwnershipProperty(content)
            }
            case 'getAllIssues': {
                return issueController.getAll(content)
            }
            default: return
        }
    } catch (err) {
        console.error(err.message)
    }
}
module.exports = issueRouter
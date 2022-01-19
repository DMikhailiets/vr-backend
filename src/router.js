const { projectController, modelController, subscriptionTypeController, subscriptionController, 
        userTypeController, usersProjectsController, userController, rulesController, issueController } = require('./controllers')

const router = (content, params) => {
    switch (content.entity) {
        case 'subscriptionType': {
            return subscriptionTypeController(content, params)
        }
        case 'userType': {
            return userTypeController(content, params)
        }
        case 'subscription': {
            return subscriptionController(content, params)
        }
        case 'project': {
            return projectController(content, params)
        }
        case 'model': {
            return modelController(content, params)
        }
        case 'projectMembership': {
            return usersProjectsController(content, params)
        }
        case 'rules': {
            return rulesController(content, params)
        }
        case 'issue': {
            return issueController(content, params)
        }
        default: return
    }
}
module.exports = router
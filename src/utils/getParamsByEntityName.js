const getParamsByEntityName = (entity) => {
    switch (entity) {
        case 'issue': {
            return {
                properties: [
                    {
                        name: 'requestUserId' 
                    }, 
                    { 
                        name: 'category'
                    }, 
                    { 
                        name: 'status'
                    }, 
                    { 
                        name: 'priority'
                    }, 
                    { 
                        name: 'description'
                    }, 
                    { 
                        name: 'executorId'
                    }, 
                    { 
                        name: 'enable'
                    }, 
                    { 
                        name: 'closedTime'
                    }
                ],  ownershipProperty: {
                    requestProperty: 'requestUserId',
                    targetProperty: 'requestUserId'
                },
                modelName: 'Application',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
        }}
        case 'user': {
            return {
                properties: [
                    {
                        name: 'cost' 
                    }, 
                    { 
                        name: 'description'
                    }, 
                    { 
                        name: 'isPublic'
                    }, 
                    { 
                        name: 'duration',
                        alias: 'latency'
                    }, 
                    { 
                        name: 'title'
                    }
                ],
                modelName: 'User',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
        }}
        case 'subscriptionType': {
            return {
                properties: [
                    {
                        name: 'cost' 
                    }, 
                    { 
                        name: 'description'
                    }, 
                    { 
                        name: 'isPublic'
                    }, 
                    { 
                        name: 'duration',
                        alias: 'latency'
                    }, 
                    { 
                        name: 'title'
                    }
                ],
                modelName: 'SubscriptionType',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
        }}
        case 'subscription': {
            return {
                properties: [
                    {
                        name: 'typeId',
                        alias: 'type'
                    }, 
                    {
                        name: 'userId'
                    }, 
                    {
                        name: 'expiresAt'
                    }
                ],
                modelName: 'Subscription',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
            }
        }
        case 'project': {
            return {
                properties: [
                    {
                        name: 'data'
                    },
                    {
                        name: 'description'
                    },
                    {
                        name: 'isPublic'
                    },
                    {
                        name: 'managerId'
                    },
                    {
                        name: 'title'
                    }
                ],
                modelName: 'Project',
                ownershipProperty: {
                    requestProperty: 'requestUserId',
                    targetProperty: 'managerId'
                },
                include: ['Models', 'UsersProjects'],
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
            }
        }case 'projectMembership': {
            return {
                properties: [
                    {
                        name: 'userId'
                    },
                    {
                        name: 'projectId'
                    }
                ],
                modelName: 'UsersProjects',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
            }
        }
        case 'model': {
            return {
                properties: [
                    {
                        name: 'title'
                    },
                    {
                        name: 'description'
                    },
                    {
                        name: 'url'
                    },
                    {
                        name: 'projectId'
                    },
                    {
                        name: 'managerId'
                    }
                ],
                unchangableProperties: ['url', 'projectId'],
                ownershipProperty: {
                    requestProperty: 'entityId',
                    targetProperty: 'projectId'
                },
                modelName: 'Models',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
            }
        }
        case 'userType': {
            return {
                properties: [
                    {
                        name: 'data'
                    },
                    {
                        name: 'description'
                    },
                    {
                        name: 'isPublic'
                    },
                    {
                        name: 'managerId'
                    },
                    {
                        name: 'title'
                    },
                    {
                        name: 'code'
                    },
                    {
                        name: 'color'
                    }
                ],
                modelName: 'UserType',
                include: ['Rules'],
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update'],
                    delete: ['delete']
                }
            }
        }
        case 'rules': {
            return {
                properties: [
                    {
                        name: 'userTypeId'
                    },
                    {
                        name: 'entity'
                    },
                    {
                        name: 'create'
                    },
                    {
                        name: 'update'
                    },
                    {
                        name: 'delete'
                    },
                    {
                        name: 'get'
                    }
                ],
                modelName: 'Rules',
                authMethods: {
                    get: ['getOne', 'getAll'],
                    create: ['create'],
                    update: ['patch', 'update', 'updateField'],
                    delete: ['delete']
                }
            }
        }
        default: {
            return []
        }
    }
}

module.exports = getParamsByEntityName
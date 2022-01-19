const getObjectForNewModel = (properties, data) => {
    const newEntity = {}
    properties.forEach(property => {
        newEntity[property.name] = data[property.alias || property.name]
    })
    return newEntity
}

module.exports = getObjectForNewModel
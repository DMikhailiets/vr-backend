const paranoidDeleteCascade = async (instance) => {
  const { model } = instance
  let { id } = instance.where
  if (!model.options.paranoid || !id) {
    return
  }
  try {
    for (let association in model.associations) {
      const { foreignKeyField } = model.associations[association]
      const associationEntity = model.associations[association].target
      await associationEntity.destroy({ where: {
          [foreignKeyField]: id
        } 
      })
    }
  } catch (err) {
    console.error(err.message)
  }
} 

module.exports =  paranoidDeleteCascade;
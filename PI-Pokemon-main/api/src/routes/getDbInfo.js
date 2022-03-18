const {Pokemon, Type} =  require('../db')

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include : {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []

            }
        }
    })
}

module.exports = {
    getDbInfo
}
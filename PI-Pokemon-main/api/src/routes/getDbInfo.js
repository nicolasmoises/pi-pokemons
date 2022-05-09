const {Pokemon, Type} =  require('../db')

const getDbInfo = async () => {
    const getDbInfo = await Pokemon.findAll({
        include:{
            model:Type,
            attributes:['name'],
            through: {
                attributes: []
            }
        }
    })
    const mapInfo = getDbInfo?.map(e => {
        return {
            id:e.id,
            name: e.name,
            height:e.height,
            weight: e.weight,
            health: e.health,
            speed: e.speed,
            defense: e.defense,
            attack: e.attack,
            image: e.image,
            types: e.types?.map((e) => e.name),
            createInDb:e.createInDb


        }
    })
    return mapInfo
}

module.exports = {
    getDbInfo
}
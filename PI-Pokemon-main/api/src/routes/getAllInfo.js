const {getDbInfo} = require('./getDbInfo');
const {getInfoApi} = require('./getInfoApi');

const getAllInfo = async () => {
    let apiInfo = await getInfoApi();
    // console.log(apiInfo)
    let dbInfo = await getDbInfo();
    // console.log('dbinfo', dbInfo)
    let infoTotal = apiInfo.concat(dbInfo)
    // console.log(infoTotal)
    return infoTotal
}
module.exports = {
    getAllInfo
}
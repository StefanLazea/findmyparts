const Stocks = require('../models').Stocks;


const findStocksByUserId = async (userId) => {
    let stockFound;
    await Stocks.findAll({
        where: { userId: userId }
    }).then((stock) => stockFound = stock);

    return stockFound;
}

/**
 * Find stock object which has partId and userId same as the ones from params
 * @param {*} userId 
 * @param {*} partId 
 * @returns object
 */
const findPartStockOfUser = async (userId, partId) => {
    let stockFound;
    await Stocks.findAll({
        where: { userId: userId, partId: partId }
    }).then((stock) => stockFound = stock);

    if (stockFound.length === 1) {
        return stockFound[0]
    }
    return {};
}

const findPartsStock = async (partId) => {
    let stockFound;
    await Stocks.findAll({
        where: { partId: partId }
    }).then((stock) => stockFound = stock);

    return stockFound;
}

module.exports = {
    findStocksByUserId,
    findPartStockOfUser,
    findPartsStock
}

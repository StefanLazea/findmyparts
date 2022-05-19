const StockService = require('../services/stock')

const getUserStock = async (req, res) => {
    const paramId = req.params.userId;
    const stock = await StockService.findStocksByUserId(paramId)
    if (!stock) {
        return res.status(404).send({ message: "Stock not found" })
    }
    //refactor
    return res.status(200).send(stock)


}
const getPartStock = async (req, res) => {
    const partId = req.params.partId;

    const stock = await StockService.findPartsStock(partId)
    if (!stock) {
        return res.status(404).send({ message: "Stock for current part not found" })
    }
    //refactor
    return res.status(200).send(stock)

}

const getUserStockDetails = async (req, res) => {
    const userId = req.params.userId;
    const partId = req.params.partId;

    let allStocks = await StockService.findPartsStock(partId)
    allStocks = JSON.parse(JSON.stringify(allStocks))

    let foundPartStock = await StockService.findPartStockOfUser(userId, partId);
    foundPartStock = JSON.parse(JSON.stringify(foundPartStock))

    const mediumPrice = allStocks?.reduce((acc, current) => acc + current.price, 0) / allStocks.length
    const totalStock = allStocks?.reduce((acc, current) => acc + Number(current.quantity), 0)

    return res.send({
        mediumPrice: mediumPrice,
        allStock: totalStock,
        userStock: foundPartStock.quantity,
        userPrice: foundPartStock.price
    })
}

module.exports = {
    getUserStock,
    getPartStock,
    getUserStockDetails
}
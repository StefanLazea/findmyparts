const StockService = require("../services/stock");
const Stocks = require("../models").Stocks;
const Parts = require("../models").Part;
const DocumentsService = require("../services/document");
const CarsService = require("../services/car");

const getGeneralDetails = async (req, res) => {
  const paramId = req.params.userId;
  const stock = await StockService.findStocksByUserId(paramId);
  const documentsCount = JSON.parse(
    JSON.stringify(await DocumentsService.findDocumentByUserId(paramId))
  );
  const carsCount = JSON.parse(
    JSON.stringify(await CarsService.findCarsByUserId(paramId))
  );
  if (!stock) {
    return res.status(404).send({ message: "Stock not found" });
  }
  console.log({ documentsCount });
  return res
    .status(200)
    .send({ documents: documentsCount.length, cars: carsCount.length });
};
module.exports = { getGeneralDetails };

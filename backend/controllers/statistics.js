const StockService = require("../services/stock");
const DocumentsService = require("../services/document");
const PartsService = require("../services/part");
const CarsService = require("../services/car");

const getGeneralDetails = async (req, res) => {
  const paramId = req.params.userId;

  if (!paramId) {
    return res.status(404).send({ message: "Please provide an userId" });
  }
  const documentsCount = JSON.parse(
    JSON.stringify(await DocumentsService.findDocumentsByUserId(paramId))
  );
  const partsCount = JSON.parse(
    JSON.stringify(await PartsService.findQuery(req.params.userId))
  );

  const carsCount = JSON.parse(
    JSON.stringify(await CarsService.findCarsByUserId(paramId))
  );

  return res.status(200).send({
    documents: documentsCount.length,
    cars: carsCount.length,
    parts: partsCount.length,
  });
};
module.exports = { getGeneralDetails };

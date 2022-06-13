const Cars = require("../models").Cars;
const Documents = require("../models").Documents;

const { BACKEND_CONSTANTS } = require("../resources/constants");

const findAll = async () => {
  return await Cars.findAll({
    include: [{ model: Documents }],
  });
};
const findCarById = async (carId) => {
  let carFound;
  await Cars.findOne({
    where: { id: carId },
  }).then((part) => (carFound = part));

  return carFound;
};
const findCarsByUserId = async (userId) => {
  return await Cars.findAll({
    where: [{ userId: userId }],
    include: [{ model: Documents }],
  });
};

const findCarDetailsById = async (partId) => {
  let carFound;
  await Cars.findOne({
    where: { id: partId },
    include: [{ model: Documents }],
  }).then((part) => (carFound = part));

  return carFound;
};
const findCarByVIN = async (vin) => {
  let carFound;
  await Cars.findOne({
    where: { VIN: vin },
  }).then((part) => (carFound = part));

  return carFound;
};

const getCarsFormattedResponse = (allCars) => {
  const jsonResponse = JSON.parse(JSON.stringify(allCars));
  const formattedResponse = jsonResponse.map((car) => {
    return getCarFormattedDetails(car);
  });
  return formattedResponse;
};

const getCarFormattedDetails = (car) => {
  const carParsed = JSON.parse(JSON.stringify(car));
  const hasRCA = carParsed.documents.some(
    (doc) => doc.name === BACKEND_CONSTANTS.DOCUMENTS.RCA
  );
  const hasITP = carParsed.documents.some(
    (doc) => doc.name === BACKEND_CONSTANTS.DOCUMENTS.ITP
  );
  const hasRovigneta = carParsed.documents.some(
    (doc) => doc.name === BACKEND_CONSTANTS.DOCUMENTS.ROVIGNETA
  );
  return { ...carParsed, hasRCA, hasITP, hasRovigneta };
};

module.exports = {
  findAll,
  findCarById,
  findCarByVIN,
  findCarsByUserId,
  getCarsFormattedResponse,
  findCarDetailsById,
  getCarFormattedDetails,
};

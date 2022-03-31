const Cars = require('../models').Cars;
const { BACKEND_CONSTANTS } = require('../resources/constants');

const findCarById = async (partId) => {
    let carFound;
    await Cars.findOne({
        where: { id: partId }
    }).then((part) => carFound = part);

    return carFound;
}
const findCarByVIN = async (vin) => {
    let carFound;
    await Cars.findOne({
        where: { VIN: vin }
    }).then((part) => carFound = part);

    return carFound;
}

const getCarsFormattedResponse = (allCars) => {
    // console.log(allCars.toJSON())
    const jsonResponse = JSON.parse(JSON.stringify(allCars));

    const formattedResponse = jsonResponse.map((car) => {
        const hasRCA = car.documents.some(doc => doc.name === BACKEND_CONSTANTS.DOCUMENTS.RCA)
        const hasITP = car.documents.some(doc => doc.name === BACKEND_CONSTANTS.DOCUMENTS.ITP)
        const hasRovigneta = car.documents.some(doc => doc.name === BACKEND_CONSTANTS.DOCUMENTS.ROVIGNETA)

        console.log({ hasRCA })
        return { ...car, hasRCA, hasITP, hasRovigneta };
    })
    return formattedResponse;
}
module.exports = {
    findCarById,
    findCarByVIN,
    getCarsFormattedResponse
}

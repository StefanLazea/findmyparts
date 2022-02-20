const Cars = require('../models').Cars;

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
module.exports = {
    findCarById,
    findCarByVIN
}

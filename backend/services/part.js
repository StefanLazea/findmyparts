const Parts = require('../models').Part;

const findPartByCode = async (code) => {
    let partFound;
    await Parts.findOne({
        where: {
            code: code
        }
    }).then((part) => partFound = part);

    return partFound;
}

const findPartById = async (partId) => {
    let partFound;
    await Parts.findOne({
        where: { id: partId }
    }).then((part) => partFound = part);

    return partFound;
}
module.exports = {
    findPartByCode,
    findPartById
}

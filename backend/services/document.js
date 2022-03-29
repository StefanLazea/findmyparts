const Documents = require('../models').Documents;

const findDocumentById = async (document) => {
    let docFound;
    await Documents.findOne({
        where: { id: docId }
    }).then((doc) => docFound = doc);

    return docFound;
}

const findDocumentByCarIdAndType = async ({ carId, type }) => {
    let docFound;
    await Documents.findOne({
        where: {
            carId: carId,
            //todo rename name to type in db
            name: type
        }
    }).then((doc) => docFound = doc);

    return docFound;
}

const isDocExpired = (date) => {
    const expirationTimestamp = new Date(date).getTime();
    let expired = false;
    if (expirationTimestamp - new Date().getTime() < 0) {
        expired = true;
    }
    return expired;
}


module.exports = {
    findDocumentById,
    findDocumentByCarIdAndType,
    isDocExpired
}

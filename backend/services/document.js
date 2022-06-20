const Documents = require("../models").Documents;
const { Op } = require("sequelize");

const findDocumentById = async (docId) => {
  let docFound;
  await Documents.findOne({
    where: { id: docId },
  }).then((doc) => (docFound = doc));

  return docFound;
};

const findDocumentByCarIdAndType = async ({ carId, type }) => {
  let docFound;
  await Documents.findOne({
    where: {
      [Op.and]: [{ carId: carId }, { name: type }],
    },
  }).then((doc) => (docFound = doc));

  return docFound;
};

const isDocExpired = (date) => {
  const expirationTimestamp = new Date(date).getTime();
  let expired = false;
  if (expirationTimestamp - new Date().getTime() < 0) {
    expired = true;
  }
  return expired;
};

const findCarDocsFormatted = async (carId) => {
  return await Documents.findAll({
    where: {
      carId: carId,
    },
  }).then((allDocs) => {
    const documents = allDocs.map((item) => {
      return {
        expired: isDocExpired(item.dataValues.expirationDate),
        ...item.dataValues,
        expirationDate: new Date(item.expirationDate).getTime(),
        fromDate: new Date(item.fromDate).getTime(),
      };
    });
    return documents;
  });
};

module.exports = {
  findDocumentById,
  findDocumentByCarIdAndType,
  findCarDocsFormatted,
  isDocExpired,
};

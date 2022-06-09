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
  console.log(carId, type);
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
  console.log(expirationTimestamp, new Date().getTime());
  let expired = false;
  if (expirationTimestamp - new Date().getTime() < 0) {
    expired = true;
  }
  return expired;
};

module.exports = {
  findDocumentById,
  findDocumentByCarIdAndType,
  isDocExpired,
};

const Documents = require("../models").Documents;
const DocumentsService = require("../services/document");
const _ = require("lodash");
const { BACKEND_CONSTANTS } = require("../resources/constants");

const getAllDocuments = async (req, res) => {
  try {
    await Documents.findAll().then((allDocs) => {
      return res.status(200).send(allDocs);
    });
  } catch (err) {
    return res
      .status(404)
      .send({ message: "No elements found in the database" });
  }
};

const addDocument = async (req, res) => {
  if (!req.body) {
    return res
      .status(500)
      .message({ message: "You need to send body params." });
  }

  if (!req.body.carId) {
    return res
      .status(500)
      .send({ message: "Nu puteti trimite fara id-ul masinii!" });
  }

  // todo check for valid date && not to be a date from past
  if (!req.body.expirationDate) {
    return res
      .status(500)
      .send({ message: "Nu puteti trimite fara data expirarii!" });
  }

  const document = {
    ...req.body,
    name: req.params.type,
  };

  const doc = await DocumentsService.findDocumentByCarIdAndType({
    carId: document.carId,
    type: req.params.type,
  });
  if (doc) {
    return res.status(409).send({ message: "Documentul exista deja" });
  }
  //TODO in case of buying another RCA it should call the update.
  try {
    await Documents.create(document);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
  return res
    .status(200)
    .send({ message: "Document has been created successfully" });
};

const getCarDocuments = async (req, res) => {
  try {
    const documents = await DocumentsService.findCarDocsFormatted(
      req.params.carId
    );
    return res.status(200).send(documents);
  } catch (err) {
    return res
      .status(404)
      .send({ message: "No elements found in the database", err });
  }
};

const updateDocument = async (req, res) => {
  const paramId = req.params.docId;
  const doc = await DocumentsService.findDocumentById(paramId);
  if (!doc) {
    return res.status(404).send({ message: "Document not found" });
  }

  try {
    await Documents.update(req.body, {
      where: { id: paramId },
    });

    return res
      .status(200)
      .send({ message: "Document details updated successfully!" });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const deleteDocument = async (req, res) => {
  const paramId = req.params.docId;
  const doc = await DocumentsService.findDocumentById(paramId);
  if (!doc) {
    return res.status(404).send({ message: "Document not found" });
  }

  await doc.destroy().then(() => {
    return res.send({ message: "Document deleted" });
  });
};

const getDocument = async (req, res) => {
  const paramId = req.params.docId;
  const doc = await DocumentsService.findDocumentById(paramId);
  if (!doc) {
    return res.status(404).send({ message: "Doc not found" });
  }
  return res.status(200).send(doc);
};

const getUserCarsWithDocuments = async (req, res) => {
  const paramId = req.params.userId;
  const docs = await DocumentsService.findDocsWithCarByUserId(paramId);
  if (!docs) {
    return res.status(404).send({ message: "Docs not found" });
  }
  const docsResponse = JSON.parse(JSON.stringify(docs));
  const rovData = [],
    rcaData = [],
    itpData = [];
  docsResponse.forEach((item) => {
    switch (item.name) {
      case BACKEND_CONSTANTS.DOCUMENTS.RCA: {
        const element = {
          x: _.get(item, "car.numberPlate", "N/A"),
          y: Number(_.get(item, "price", 0)),
        };
        rcaData.push(element);
        return;
      }
      case BACKEND_CONSTANTS.DOCUMENTS.ITP: {
        const element = {
          x: _.get(item, "car.numberPlate", "N/A"),
          y: Number(_.get(item, "price", 0)),
        };
        itpData.push(element);
        return;
      }
      case BACKEND_CONSTANTS.DOCUMENTS.ROVIGNETA: {
        const element = {
          x: _.get(item, "car.numberPlate", "N/A"),
          y: Number(_.get(item, "price", 0)),
        };
        rovData.push(element);
        return;
      }
    }
  });
  const statisticsResponse = [
    {
      id: "RCA",
      data: _.sortBy(rcaData, "price"),
    },
    { id: "ITP", data: _.sortBy(rcaData, "price") },
    rovData.length !== 1 && {
      id: "Rovigneta",
      data: _.sortBy(rcaData, "price"),
    },
  ];

  return res.status(200).send(statisticsResponse);
};

module.exports = {
  getAllDocuments,
  getCarDocuments,
  updateDocument,
  addDocument,
  deleteDocument,
  getDocument,
  getUserCarsWithDocuments,
};

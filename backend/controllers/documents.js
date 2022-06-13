const Documents = require("../models").Documents;
const DocumentsService = require("../services/document");

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
  console.log(req.body);
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
    console.log(err);
    return res.status(500).send({ message: err });
  }
  return res
    .status(200)
    .send({ message: "Document has been created successfully" });
};

const getCarDocuments = async (req, res) => {
  try {
    await Documents.findAll({
      where: {
        carId: req.params.carId,
      },
    }).then((allDocs) => {
      const documents = allDocs.map((item) => {
        console.log(
          DocumentsService.isDocExpired(item.dataValues.expirationDate)
        );
        return {
          expired: DocumentsService.isDocExpired(
            item.dataValues.expirationDate
          ),
          ...item.dataValues,
          expirationDate: new Date(item.expirationDate).getTime(),
          fromDate: new Date(item.fromDate).getTime(),
        };
      });
      return res.status(200).send(documents);
    });
  } catch (err) {
    return res
      .status(404)
      .send({ message: "No elements found in the database", err });
  }
};

const updateDocument = async (req, res) => {
  console.log("HELLO");
  const paramId = req.params.docId;
  const doc = await DocumentsService.findDocumentById(paramId);
  console.log("alooo", paramId, doc);
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

module.exports = {
  getAllDocuments,
  getCarDocuments,
  updateDocument,
  addDocument,
  deleteDocument,
  getDocument,
};

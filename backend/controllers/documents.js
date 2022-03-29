const Documents = require('../models').Documents;
// const DocumentsService = require('../services/document');
const getAllDocuments = async (req, res) => {
    try {
        await Documents.findAll().then((allDocs) => { return res.status(200).send(allDocs) });
    }
    catch (err) {
        return res.status(404).send({ message: "No elements found in the database" });
    }
}

const addDocument = async (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(500).message({ message: "You need to send body params." })
    }

    if (!req.body.carId) {
        return res.status(500).send({ message: "Nu puteti trimite fara id-ul masinii!" });
    }

    const document = {
        ...req.body,
        name: req.params.type
    }

    //TODO check if car has already a document with these dates
    try {
        await Documents.create(document);
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err });
    }
    return res.status(200).send({ message: "Document has been created successfully" })
};

const getCarDocuments = async (req, res) => {
    try {
        await Documents.findAll({
            where: {
                carId: req.params.carId
            }
        }).then((allDocs) => {
            const documents = allDocs.map((item) => {
                const expirationTimestamp = new Date(item.dataValues.expirationDate).getTime();
                let isExpired = false;
                if (expirationTimestamp - new Date().getTime() < 0) {
                    isExpired = true;
                }
                return { isExpired, ...item.dataValues }
            })
            return res.status(200).send(documents)
        });
    }
    catch (err) {
        return res.status(404).send({ message: "No elements found in the database", err });
    }
}

module.exports = {
    getAllDocuments,
    getCarDocuments,
    addDocument,

}
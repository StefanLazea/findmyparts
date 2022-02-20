const Parts = require('../models').Part;
const PartsService = require('../services/part');

const getAllParts = async (req, res) => {
    try {
        await Parts.findAll().then((allParts) => { return res.status(200).send(allParts) });
    }
    catch (err) {
        return res.status(404).send({ message: "No elements found in the database" });
    }
}

const savePart = async (req, res) => {
    console.log(req.body)
    let location = "";
    if (!req.body) {
        return res.status(500).message({ message: "You need to send body params." })
    }

    if (!req.body.code) {
        return res.status(500).send({ message: "Nu puteti trimite fara cod!" });
    }

    let parts = {
        ...req.body
    }

    if (await PartsService.findPartByCode(parts.code) === null) {
        try {
            await Parts.create(parts);
        } catch (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send({ message: "Part has been created successfully" })
    }
    return res.status(400).send({ message: "Part is already in" })
};

const updatePart = async (req, res) => {
    console.log(req.params.partId)

    return res.status(400).send({ message: "Part is already in" })
};

const deletePart = async (req, res) => {
    const paramId = req.params.partId;
    console.log(paramId)
    const part = await PartsService.findPartById(paramId)
    console.log(part)
    if (!part) {
        return res.status(404).send({ message: "Part not found" })
    }

    await part.destroy().then(() => { return res.send({ message: "Part deleted" }) });
};

module.exports = {
    getAllParts,
    savePart,
    updatePart,
    deletePart
}
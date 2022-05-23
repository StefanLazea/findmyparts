const Parts = require('../models').Part;
const Users = require('../models').User;
const _ = require("lodash")
const PartsService = require('../services/part');

const getAllParts = async (req, res) => {
    try {
        const parts = await PartsService.findAll();
        return res.status(200).send(parts);
    }
    catch (err) {
        return res.status(404).send({ message: "No elements found in the database" });
    }
}

const savePart = async (req, res) => {
    const part = {
        name: req.body.name,
        code: req.body.code,
        photo: req.body?.photo
    }
    const partAlreadyExist = await PartsService.findPartByCode(req.body.code);

    if (partAlreadyExist) {
        return res.status(302).send({ message: 'Please send an unique code' })
    }
    if (_.isNil(part)) {
        return res.status(400).send({ message: 'Please send a body or a correct format' })
    }
    const createdPart = await Parts.create(part);
    const userId = req.body.userId
    const user = await Users.findByPk(userId)
    const addedPart = user.addPart(createdPart,
        {
            through: {
                price: req.body.price,
                currency: "lei",
                quantity: req.body.quantity,
            }
        }
    )
    if (!createdPart && !addedPart) {
        return res.status(500).send({ message: 'issue creating part' });

    }
    return res.status(200).send({ message: "Added part and added stock" });
}

//TODO test and treat cases when body and items from it are missing
/**
 * get all parts with user and stock details
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllPartsWithUserStock = async (req, res) => {
    const user = await Users.findByPk(req.params.userId, {
        include: [{
            model: Parts,
            through: { attributes: [] }
        }]
    });

    const partsResult = await user.getParts({
        joinTableAttributes: ["quantity", "price", "userId"]
    });

    if (_.isEmpty(partsResult)) {
        return res.status(404).send({ message: "Not found" })
    }
    return res.status(200).send(partsResult)
}

/**
 * Get one part given the partId in the params
 * @param {*} req 
 * @param {*} res 
 * @returns part object with user and stock detail
 */
const getOnePartWithUserStock = async (req, res) => {
    const found = await Parts.findAll({
        include: { model: Users, attributes: ["id", "email"] },
        where: { id: req.params.partId }
    });
    const fnd = JSON.parse(JSON.stringify(found))

    if (_.isEmpty(found)) {
        return res.status(404).send({ message: "No elements found in the database" });

    }
    return res.status(200).send(found[0])
}

//TODO test/error testing
/**
 * Get all parts along with user details and stock details
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllPartsStock = async (req, res) => {
    const found = await Parts.findAll({
        include: { model: Users, attributes: ["id", "email"] }
    });
    if (_.isEmpty(found)) {
        return res.status(404).send({ message: "No elements found in the database" });

    }
    return res.status(200).send(found)

}

//TODO update part not just stock 
const updatePart = async (req, res) => {
    if (_.isEmpty(req.body.userId)) {
        return res.status(500).send({ message: "Please add userId" })
    }
    const requestStock = {
        price: req.body.price,
        currency: "lei",
        quantity: req.body.quantity,
    }
    const partId = req.params.partId;
    const user = await Users.findByPk(req.body?.userId, {
        include: [{
            model: Parts,
            through: { attributes: [] }
        }]
    });

    const foundPart = await PartsService.findUserPartById({ user, partId });
    const foundPartJSON = JSON.parse(JSON.stringify(foundPart));

    if (_.isEmpty(foundPartJSON)) {
        return res.status(404).send({ message: "Part not found" });
    }

    const oldStockValues = { ...foundPartJSON[0]?.stocks }
    const calculatedNewStock = {
        ...oldStockValues,
        quantity: Number(oldStockValues.quantity) + Number(requestStock.quantity),
        price: requestStock.price,
    }
    const updatedPart = await user.setParts(foundPart,
        {
            through: calculatedNewStock
        }
    )

    if (!updatedPart) {
        return res.status(400).send({ message: "Part couldn't be updated" })
    }

    return res.status(200).send({ message: "Updated part and updated stock" });
};

const deletePart = async (req, res) => {
    const paramId = req.params.partId;
    const part = await PartsService.findPartById(paramId)
    if (!part) {
        return res.status(404).send({ message: "Part not found" })
    }
    await part.destroy().then(() => { return res.send({ message: "Part deleted" }) });
};

module.exports = {
    getAllParts,
    getAllPartsWithUserStock,
    getAllPartsStock,
    getOnePartWithUserStock,
    savePart,
    updatePart,
    deletePart
}
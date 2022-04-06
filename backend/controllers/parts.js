const Parts = require('../models').Part;
const Users = require('../models').User;
const Stocks = require('../models').Stock;
const _ = require("lodash")
const PartsService = require('../services/part');
// const UsersService = require('../services/user');

const getAllParts = async (req, res) => {
    try {
        Parts.findAll().then((allParts) => { return res.status(200).send(allParts) });
        const count = Parts.getUsers
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
    const partsResult = await user.getParts({
        joinTableAttributes: ["quantity", "price", "userId"]
    });
    console.log(partsResult)

    if (!createdPart && !addedPart) {
        return res.status(500).send({ message: 'issue creating part' });

    }
    return res.status(200).send({ message: "Added part and added stock" });

}

//TODO test and treat cases when body and items from it are missing
const getUsersPartsWithStock = async (req, res) => {
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

//TODO test/error testing
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
    getUsersPartsWithStock,
    getAllPartsStock,
    savePart,
    updatePart,
    deletePart
}
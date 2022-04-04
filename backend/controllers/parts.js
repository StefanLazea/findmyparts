const Parts = require('../models').Part;
const Users = require('../models').User;
const Stocks = require('../models').Stock;
const _ = require("lodash")
const PartsService = require('../services/part');
// const UsersService = require('../services/user');

const getAllParts = async (req, res) => {
    try {
        await Parts.findAll().then((allParts) => { return res.status(200).send(allParts) });
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

    const user = await Users.findByPk(userId, {
        include: [{
            model: Parts,
            through: { attributes: [] }
        }]
    }) //get user with parts 
    user.addPart(createdPart, {
        through: {
            price: req.body.price,
            currency: "lei",
            quantity: req.body.quantity,
        }
    })

    const partsResult = await user.getParts({
        joinTableAttributes: ["quantity", "price", "userId"]
    });
    console.log(partsResult)

    return res.status(200).send(partsResult);

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
const getPartsStock = async (req, res) => {
    const partsStock = await Parts.findAll({
        include: [
            { model: Stocks, as: 'stock' }
        ],
    });

    if (!_.isEmpty(partsStock)) {
        return res.status(200).send(partsStock)
    }
    return res.status(404).send({ message: "No elements found in the database" });
}

// const savePart = async (req, res) => {
//     console.log(req.body)
//     let location = "";
//     if (!req.body) {
//         return res.status(500).message({ message: "You need to send body params." })
//     }

//     if (!req.body.code) {
//         return res.status(500).send({ message: "Nu puteti trimite fara cod!" });
//     }

//     let parts = {
//         ...req.body
//     }

//     if (await PartsService.findPartByCode(parts.code) === null) {
//         try {
//             await Parts.create(parts);
//         } catch (err) {
//             return res.status(500).send({ message: err });
//         }
//         return res.status(200).send({ message: "Part has been created successfully" })
//     }
//     return res.status(400).send({ message: "Part is already in" })
// };

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
    getUsersPartsWithStock,
    getPartsStock,
    savePart,
    updatePart,
    deletePart
}
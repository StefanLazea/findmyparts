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
const getPartsStock = async (req, res) => {
    const part = await Parts.findByPk("ecb8dac0-b4e9-11ec-9cc6-81a0ff08c188")
    const user = await Users.findByPk("e0351e80-b4e9-11ec-9cc6-81a0ff08c188")

    // if (!_.isEmpty(partsStock)) {
    //     return res.status(200).send(partsStock)
    // }
    // part.getUsersStocks().then(stock => console.log(JSON.parse(JSON.stringify(stock))))
    // const stock = await user.getPartsStocks() //.then(stock => console.log(JSON.parse(JSON.stringify(stock))))
    // if (stock) {
    //     return res.status(200).send(stock)
    // }
    // const parts = await Parts.findAll()

    return res.status(404).send({ message: "No elements found in the database" });
}

const updatePart = async (req, res) => {
    const updatedStock = {
        price: req.body.price,
        currency: "lei",
        quantity: req.body.quantity,
    }
    const partId = req.params.partId;

    const userId = req.body.userId
    const user = await Users.findByPk(userId, {
        include: [{
            model: Parts,
            through: { attributes: [] }
        }]
    });
    const foundPart = await user.getParts({
        // include: [{
        //     model: Stocks
        // }]
        where: { id: partId }
        // joinTableAttributes: ["quantity", "price", "userId"],
        // where: { partId: partId }
    });
    const updatedPart = await user.setParts(foundPart,
        {
            through: updatedStock
        }
    )
    // const currentStock = await Stocks.findAll({ where: { partId: partId } })
    console.log(JSON.parse(JSON.stringify(foundPart)))

    // console.log(JSON.parse(JSON.stringify(partsResult)))
    // const partsResult = await user.getParts({
    //     joinTableAttributes: ["quantity", "price", "userId"]
    // });
    // console.log(partsResult)

    // if ( !updatePart) {
    //     return res.status(500).send({ message: 'issue creating part' });

    // }
    return res.status(200).send({ message: "Added part and added stock" });

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
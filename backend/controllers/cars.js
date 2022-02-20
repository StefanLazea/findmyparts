const Cars = require('../models').Cars;
const CarsService = require('../services/car');

const getAllCars = async (req, res) => {
    try {
        await Cars.findAll().then((allCars) => { return res.status(200).send(allCars) });
    }
    catch (err) {
        return res.status(404).send({ message: "No elements found in the database" });
    }
}

const saveCar = async (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(500).message({ message: "You need to send body params." })
    }

    if (!req.body.VIN) {
        return res.status(500).send({ message: "Nu puteti trimite fara cod!" });
    }

    let car = {
        ...req.body
    }

    if (await CarsService.findCarByVIN(car.VIN) === null) {
        try {
            await Cars.create(car);
        } catch (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send({ message: "Car has been created successfully" })
    }
    return res.status(400).send({ message: "Car is already in" })
};

// const updatePart = async (req, res) => {
//     console.log(req.params.partId)

//     return res.status(400).send({ message: "Part is already in" })
// };

// const deletePart = async (req, res) => {
//     const paramId = req.params.partId;
//     console.log(paramId)
//     const part = await PartsService.findPartById(paramId)
//     console.log(part)
//     if (!part) {
//         return res.status(404).send({ message: "Part not found" })
//     }

//     await part.destroy().then(() => { return res.send({ message: "Part deleted" }) });
// };

module.exports = {
    getAllCars,
    saveCar,
    // updatePart,
    // deletePart
}
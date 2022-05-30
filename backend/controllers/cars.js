const Cars = require('../models').Cars;
const Documents = require('../models').Documents;
const _ = require("lodash")

const CarsService = require('../services/car');
const { CAR_BRANDS_MOCK } = require('../utils/cars')

const getAllCars = async (req, res) => {
    const allCars = await Cars.findAll({
        include: [
            { model: Documents }
        ],
    });

    if (!_.isEmpty(allCars)) {
        return res.status(200).send(CarsService.getCarsFormattedResponse(allCars))
    }
    return res.status(404).send({ message: "No elements found in the database" });


}

const saveCar = async (req, res) => {
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

const updateCar = async (req, res) => {
    const car = req.body;
    try {
        await Cars.update(
            car,
            {
                where:
                    { id: req.params.carId }
            }
        );

        return res.status(200).send({ message: "Car details updated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" });
    }
}

const deleteCar = async (req, res) => {
    const paramId = req.params.carId;
    console.log(paramId)
    const car = await CarsService.findCarById(paramId)
    if (!car) {
        return res.status(404).send({ message: "Car not found" })
    }
    await car.destroy().then(() => { return res.send({ message: "Car deleted" }) });
};

const getCarBrands = (req, res) => {
    return res.status(200).send(CAR_BRANDS_MOCK);
}

const getCarById = async (req, res) => {
    const paramId = req.params.carId;
    const car = await CarsService.findCarDetailsById(paramId)
    if (!car) {
        return res.status(404).send({ message: "Car not found" })
    }
    //refactor
    return res.status(200).send(CarsService.getCarFormattedDetails(car))
}

module.exports = {
    getAllCars,
    saveCar,
    updateCar,
    getCarBrands,
    deleteCar,
    getCarById
    // updatePart,
    // deletePart
}
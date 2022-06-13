const router = require("express").Router();
const CarsController = require("../controllers/cars");
// const { authorizeGoogle } = require('../services/authorize');

router.get("/", CarsController.getAllCars);
router.get("/users/:userId", CarsController.getUsersCars);

router.get("/:carId", CarsController.getCarById);
router.get("/:carId/details", CarsController.getCarDetailsById);
router.put("/:carId", CarsController.updateCar);
router.post("/save", CarsController.saveCar);
router.delete("/:carId", CarsController.deleteCar);
router.get("/brands", CarsController.getCarBrands);

module.exports = router;

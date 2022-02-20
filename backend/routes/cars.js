const router = require('express').Router();
const CarsController = require('../controllers/cars');
// const { authorizeGoogle } = require('../services/authorize');

router.get("/", CarsController.getAllCars);
// router.get("/user/:userId", CarsController.getCarsByUserId);
router.post("/save", CarsController.saveCar);
// router.delete("/:carId", CarsController.deleteCar);

module.exports = router;
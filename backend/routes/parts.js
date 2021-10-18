const router = require('express').Router();
const PartsController = require('../controllers/parts');


router.get("/", PartsController.getAllParts);
router.post("/", PartsController.savePart);

module.exports = router;
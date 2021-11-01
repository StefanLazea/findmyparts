const router = require('express').Router();
const PartsController = require('../controllers/parts');
const { authorizeGoogle } = require('../services/authorize');

// router.get("/", authorizeGoogle, PartsController.getAllParts);
router.get("/", PartsController.getAllParts);

router.post("/", PartsController.savePart);

module.exports = router;
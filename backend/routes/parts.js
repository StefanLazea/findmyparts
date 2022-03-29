const router = require('express').Router();
const PartsController = require('../controllers/parts');
// const { authorizeGoogle } = require('../services/authorize');

// router.get("/", authorizeGoogle, PartsController.getAllParts);
router.get("/", PartsController.getAllParts);
router.post("/savePart", PartsController.savePart);
router.delete("/:partId", PartsController.deletePart);

module.exports = router;
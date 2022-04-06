const router = require('express').Router();
const PartsController = require('../controllers/parts');
// const { authorizeGoogle } = require('../services/authorize');

router.get("/", PartsController.getAllParts);
router.post("/savePart", PartsController.savePart);
router.put("/:partId", PartsController.updatePart);
router.delete("/:partId", PartsController.deletePart);

router.get("/users/:userId/stock", PartsController.getUsersPartsWithStock)
router.get("/users/stock", PartsController.getAllPartsStock)


module.exports = router;
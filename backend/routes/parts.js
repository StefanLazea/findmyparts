const router = require('express').Router();
const PartsController = require('../controllers/parts');
// const { authorizeGoogle } = require('../services/authorize');

router.get("/", PartsController.getAllParts);
router.post("/", PartsController.savePart);
router.put("/:partId", PartsController.updatePart);
router.delete("/:partId", PartsController.deletePart);
router.get("/:partId/users/stock", PartsController.getOnePartWithUserStock)
router.get("/users/:userId/stock", PartsController.getAllPartsWithUserStock)

router.get("/users/stock", PartsController.getAllPartsStock)
router.get("/users/stock/details", PartsController.getAllPartsStockDetails)
router.get("/:partId/users/stock/details", PartsController.getPartStockDetails)

module.exports = router;
const router = require('express').Router();
const PartsController = require('../controllers/parts');

router.get("/", PartsController.getAllParts);
router.post("/", PartsController.savePart);
router.put("/:partId", PartsController.updatePart);
router.delete("/:partId", PartsController.deletePart);
/**
 * Get one part - with users and stock details
 */
router.get("/:partId/users/stock", PartsController.getOnePartWithUserStock) //used
/**
 * Get Parts for a certain user, including stocks
 */
router.get("/users/:userId/stock", PartsController.getAllPartsWithUserStock) //used
/**
 * Get all parts - with user and stock details
 */
router.get("/users/stock/details", PartsController.getAllPartsStockDetails)
/**
 * Get one user's parts - with user and stock details
 */
router.get("/users/:userId/stock/details", PartsController.getPartStockDetails)
/**
 * Get one part - with user and stock details
 */
router.get("/:partId/users/stock/details", PartsController.getOnePartDetails)

module.exports = router;
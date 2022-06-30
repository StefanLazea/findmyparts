const router = require("express").Router();
const StocksController = require("../controllers/stock.js");

router.get("/", StocksController.getAllStocks);
router.get("/user/:userId", StocksController.getUserStock);
router.get("/part/:partId", StocksController.getPartStock);
router.get(
  "/details/user/:userId/part/:partId",
  StocksController.getUserStockDetails
);
// router.get("/details/user/:userId", StocksController.getGeneralDetails);

module.exports = router;

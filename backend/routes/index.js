const router = require("express").Router();
const partsRouter = require("./parts");
const usersRouter = require("./auth");
const carsRouter = require("./cars");
const googleRouter = require("./google");
const documentsRouter = require("./documents");
const stocksRouter = require("./stocks");
const statisticsRouter = require("./statistics");
const { authorizeGoogle } = require("../services/authorize");

router.use("/parts", authorizeGoogle, partsRouter);
router.use("/cars", authorizeGoogle, carsRouter);

router.use("/auth", usersRouter);
router.use("/google", googleRouter);
router.use("/documents", authorizeGoogle, documentsRouter);

router.use("/stocks", authorizeGoogle, stocksRouter);
router.use("/statistics", authorizeGoogle, statisticsRouter);

router.get("/test", authorizeGoogle, (req, res) => {
  res.send({ message: "hello" });
});
// router.get("/details/user/:userId", StocksController.getGeneralDetails);

module.exports = router;

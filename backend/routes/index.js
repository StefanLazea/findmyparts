const router = require("express").Router();
const partsRouter = require("./parts");
const usersRouter = require("./auth");
const carsRouter = require("./cars");
const googleRouter = require("./google");
const documentsRouter = require("./documents");
const stocksRouter = require("./stocks");
const statisticsRouter = require("./statistics");
const { authorizeGoogle } = require("../services/authorize");

router.use("/parts", partsRouter);
router.use("/cars", carsRouter);

router.use("/auth", usersRouter);
router.use("/google", googleRouter);
router.use("/documents", documentsRouter);

router.use("/stocks", stocksRouter);
router.use("/statistics", statisticsRouter);
router.get("/test", authorizeGoogle, (req, res) => {
  res.send({ message: "hello" });
});

// router.get("/details/user/:userId", StocksController.getGeneralDetails);

module.exports = router;

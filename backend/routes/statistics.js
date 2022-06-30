const router = require("express").Router();
const StatisticsController = require("../controllers/statistics");

router.post("/pie", (req, res) => {
  console.log("here");
});

router.get("/details/user/:userId", StatisticsController.getGeneralDetails);
module.exports = router;

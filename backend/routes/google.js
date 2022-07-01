const router = require("express").Router();
const googleController = require("../controllers/google");

router.post("/detect-image", googleController.detectImage);
router.get("/token/validation", googleController.verifyToken);

module.exports = router;

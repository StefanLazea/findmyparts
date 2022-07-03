const router = require("express").Router();
const googleController = require("../controllers/google");
const { authorizeGoogle } = require("../services/authorize");

router.post("/detect-image", authorizeGoogle, googleController.detectImage);
router.get("/token/validation", googleController.verifyToken);

module.exports = router;

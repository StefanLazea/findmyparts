const router = require('express').Router();
const UserController = require('../controllers/users');


router.get("/users", UserController.getAllUsers);
router.post("/create", UserController.createUser);
router.post("/google", UserController.googleAuth)
module.exports = router;
const router = require('express').Router();
const UserController = require('../controllers/users');


router.get("/getAllUsers", UserController.getAllUsers);
router.post("/createUser", UserController.createUser);

module.exports = router;
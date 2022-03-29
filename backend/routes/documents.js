const router = require('express').Router();
const DocumentsController = require('../controllers/documents');

router.get("/", DocumentsController.getAllDocuments);
router.post("/add/:type", DocumentsController.addDocument);
router.get("/car/:carId", DocumentsController.getCarDocuments);

module.exports = router;
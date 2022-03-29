const router = require('express').Router();
const DocumentsController = require('../controllers/documents');

//CRUD
router.get("/", DocumentsController.getAllDocuments);
router.delete("/:docId", DocumentsController.deleteDocument);
router.post("/add/:type", DocumentsController.addDocument);

router.get("/car/:carId", DocumentsController.getCarDocuments);

module.exports = router;
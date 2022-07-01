const router = require("express").Router();
const DocumentsController = require("../controllers/documents");

//CRUD
router.get("/", DocumentsController.getAllDocuments);
router.get("/:docId", DocumentsController.getDocument);
router.delete("/:docId", DocumentsController.deleteDocument);
router.post("/add/:type", DocumentsController.addDocument);
router.put("/:docId", DocumentsController.updateDocument);
router.get("/car/:carId", DocumentsController.getCarDocuments);
router.get("/user/:userId", DocumentsController.getUserCarsWithDocuments);
router.get("/expired/user/:userId", DocumentsController.getExpiredDocsForUser);

module.exports = router;

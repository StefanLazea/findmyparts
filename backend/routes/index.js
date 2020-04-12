const router = require('express').Router();
const Parts = require('../models').Part;
const PartsService = require('../services/part');

router.get("/parts", async (req, res) => {
    try {
        await Reviews.findAll().then((allReviews) => { return res.status(200).send({ message: allReviews }) });
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
});

router.post("/parts", async (req, res) => {
    let parts = {
        name: req.body.name,
        code: req.body.code,
        photo: req.body.photo,
        stock: req.body.stock
    }

    if (PartsService.findPartByCode(parts.code) == null) {
        try {
            await Parts.create(parts);
        } catch (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send({ message: "Part has created successfully" })
    }
    return res.status(400).send({ message: "Part is already in" })
})

module.exports = router;
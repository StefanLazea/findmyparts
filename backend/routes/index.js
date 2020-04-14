const router = require('express').Router();
const Parts = require('../models').Part;
const PartsService = require('../services/part');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require("path");

router.get("/parts", async (req, res) => {
    try {
        await Parts.findAll().then((allParts) => { return res.status(200).send({ message: allParts }) });
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
});

router.post("/parts", async (req, res) => {
    let location = "";
    if (req.files) {
        let image = req.files.image;
        let relativeLocation = "../private/images/" + req.body.code + ".png";
        location = path.resolve(__dirname, relativeLocation);

        image.mv(location, err => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    }

    if (req.body.code === "") {
        return res.status(500).send({ message: "Nu puteti trimite fara cod!" });
    }

    let parts = {
        name: req.body.name,
        code: req.body.code,
        photo: location,
        stock: req.body.stock,
    }

    if (await PartsService.findPartByCode(parts.code) === null) {

        try {
            await Parts.create(parts);
        } catch (err) {
            return res.status(500).send({ message: err });
        }
        return res.status(200).send({ message: "Part has created successfully" })
    }
    return res.status(400).send({ message: "Part is already in" })
});

module.exports = router;
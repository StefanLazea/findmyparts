const vision = require('@google-cloud/vision');
const _ = require("lodash")
const GOOGLE_KEY_JSON = "/Users/stefan/Documents/gasestepiesa-924dba9c251f.json"
const { MOCK } = require('./mock');
const { CONSTANTS, BACKEND_CONSTANTS } = require('../resources/constants');

const REGEX_PRICE_LEI = /[\d|,|.|]{2,10} (lei)/g;

const getFormattedResponseRCA = (text) => {
    const description = text[0]?.description.toLowerCase();

    //for start data
    const fromDateIndexOf = description.indexOf(CONSTANTS.PRE_DATE_IDENTIFIER)
    const fromDateBeginIndex = fromDateIndexOf + CONSTANTS.PRE_DATE_IDENTIFIER.length;
    const fromDateEndIndex = fromDateIndexOf + CONSTANTS.PRE_DATE_IDENTIFIER.length + CONSTANTS.DATE_FORMAT_LENGTH;

    //for the end data
    const endDateIndexOf = description.indexOf(CONSTANTS.POST_DATE_IDENTIFIER)
    const endDateBeginIndex = endDateIndexOf + CONSTANTS.POST_DATE_IDENTIFIER.length;
    const endDateEndIndex = endDateIndexOf + CONSTANTS.POST_DATE_IDENTIFIER.length + CONSTANTS.DATE_FORMAT_LENGTH;

    const fromDate = description.substring(fromDateBeginIndex, fromDateEndIndex)
    const endDate = description.substring(endDateBeginIndex, endDateEndIndex)

    // console.log(description.match(/\d{2}(\D)\d{2}\1\d{4}/g))
    const price = [...new Set(description.match(REGEX_PRICE_LEI))];
    return { fromDate: fromDate.trim(), endDate: endDate.trim(), price: price[0] };
}

const detectImage = async (req, res) => {
    // const filename = "/Users/stefan/Documents/projects/findmyparts/backend/controllers/wakeupcat.jpg";
    const client = new vision.ImageAnnotatorClient({ keyFilename: GOOGLE_KEY_JSON });
    console.log(req.files)
    const buf = req.files?.photo.data;

    if (_.isEmpty(buf)) {
        return res.status(500).send({ message: "Please send also the photo!" })
    }
    const request = {
        "image": {
            "content": Buffer.from(buf, 'base64')
        },
    };
    const [result] = await client.textDetection(request);

    if (result) {
        const text = result.textAnnotations;
        const docType = req.body.documentType;
        let formattedResponse = {};
        if (docType === BACKEND_CONSTANTS.RCA) {
            formattedResponse = getFormattedResponseRCA(text);
        }
        return res.status(200).send(formattedResponse)

    }
    return res.status(404).send({ message: "I haven't found any details in your image. Please try again." })

}

module.exports = {
    detectImage,
}
const vision = require('@google-cloud/vision');
const _ = require("lodash")
const GOOGLE_KEY_JSON = "/Users/stefan/Documents/gasestepiesa-924dba9c251f.json"
const { CONSTANTS, BACKEND_CONSTANTS } = require('../resources/constants');

const REGEX_PRICE_LEI = /[\d|,|.|]{2,10} (lei)/g;
//todo: refactor
const transformDateToTimestamp = (str) => {
    const splittedDate = str.split('/');
    const shortDateFormat = [splittedDate[1], splittedDate[0], splittedDate[2]].join('/')
    console.log(str.split("/"))
    return new Date(shortDateFormat).getTime();
}

//TODO test and refactor
const getFormattedResponseRCA = (text) => {
    const description = text[0]?.description.toLowerCase();
    console.log(description)
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

    const uniqueDetectedPrice = [...new Set(description.match(REGEX_PRICE_LEI))];
    const price = uniqueDetectedPrice[0].toLowerCase().split(" ")[0];
    const currency = uniqueDetectedPrice[0].toLowerCase().split(" ")[1]

    return {
        fromDate: transformDateToTimestamp(fromDate.trim()),
        expirationDate: transformDateToTimestamp(endDate.trim()),
        price: price,
        currency: currency
    };
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

        //TODO, format date to correct international date -> pass it as timestamp to FE
        if (docType === BACKEND_CONSTANTS.DOCUMENTS.RCA) {
            try {
                formattedResponse = getFormattedResponseRCA(text);
            } catch (err) {
                return res.status(500).send({ message: 'We encountered a problem. Try again later.' })
            }
        }
        return res.status(200).send(formattedResponse)

    }
    return res.status(404).send({ message: "I haven't found any details in your image. Please try again." })

}

module.exports = {
    detectImage,
}
const vision = require("@google-cloud/vision");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const GOOGLE_KEY_JSON =
  "/Users/stefan/Documents/projects/findmyparts/backend/gasestepiesa-924dba9c251f.json";
const { CONSTANTS, BACKEND_CONSTANTS } = require("../resources/constants");

const REGEX_PRICE_LEI = /[\d|,|.|]{2,10} (lei)/g;

const transformDateToTimestamp = (str) => {
  const splittedDate = str.split(/[-.\/]+/);
  const shortDateFormat = [
    splittedDate[1],
    splittedDate[0],
    splittedDate[2],
  ].join("/");
  const transformDate = new Date(shortDateFormat).getTime();
  return transformDate;
};

//TODO test and refactor
const getFormattedResponseRCA = (text) => {
  const description = text[0]?.description.toLowerCase();
  //for start data
  const fromDateIndexOf = description.indexOf(CONSTANTS.PRE_DATE_IDENTIFIER);
  const fromDateBeginIndex =
    fromDateIndexOf + CONSTANTS.PRE_DATE_IDENTIFIER.length;
  const fromDateEndIndex =
    fromDateIndexOf +
    CONSTANTS.PRE_DATE_IDENTIFIER.length +
    CONSTANTS.DATE_FORMAT_LENGTH;

  //for the end data
  const endDateIndexOf =
    description.indexOf(CONSTANTS.POST_DATE_IDENTIFIER) === -1
      ? description.indexOf(CONSTANTS.POST_DATE_IDENTIFIER_RO)
      : description.indexOf(CONSTANTS.POST_DATE_IDENTIFIER);
  const endDateBeginIndex =
    endDateIndexOf + CONSTANTS.POST_DATE_IDENTIFIER.length;
  const endDateEndIndex =
    endDateIndexOf +
    CONSTANTS.POST_DATE_IDENTIFIER.length +
    CONSTANTS.DATE_FORMAT_LENGTH;

  const fromDate = description.substring(fromDateBeginIndex, fromDateEndIndex);
  const endDate = description.substring(endDateBeginIndex, endDateEndIndex);

  const uniqueDetectedPrice = [...new Set(description.match(REGEX_PRICE_LEI))];
  const price = uniqueDetectedPrice[0].toLowerCase().split(" ")[0];
  const currency = uniqueDetectedPrice[0].toLowerCase().split(" ")[1];

  return {
    fromDate: transformDateToTimestamp(fromDate.trim()),
    expirationDate: transformDateToTimestamp(endDate.trim()),
    price: price,
    currency: currency,
  };
};
const getFormattedResponseITP = (text) => {
  const visionTotalResult = text[0]?.description;
  const description = visionTotalResult.split("\n").join(" ");

  const tehnicalWorkIndex =
    description.indexOf("inspecții tehnice") + "inspecții tehnice".length;
  const endWorkIndex = tehnicalWorkIndex + CONSTANTS.DATE_FORMAT_LENGTH;

  const expDateStr = description.substring(tehnicalWorkIndex, endWorkIndex);
  const expirationDate = transformDateToTimestamp(expDateStr.trim());
  return {
    fromDate: "",
    expirationDate: expirationDate,
    price: "",
    currency: "",
  };
};

const detectImage = async (req, res) => {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: GOOGLE_KEY_JSON,
  });
  const buf = req.files?.photo.data;

  if (_.isEmpty(buf)) {
    return res.status(500).send({ message: "Please send also the photo!" });
  }
  const request = {
    image: {
      content: Buffer.from(buf, "base64"),
    },
  };
  const [result] = await client.textDetection(request);
  if (result) {
    const text = result.textAnnotations;
    const docType = req.body.documentType;
    let formattedResponse = {};

    try {
      switch (docType) {
        case BACKEND_CONSTANTS.DOCUMENTS.RCA:
          formattedResponse = getFormattedResponseRCA(text);
          break;
        case BACKEND_CONSTANTS.DOCUMENTS.ITP:
          formattedResponse = getFormattedResponseITP(text);
          break;
        default:
          break;
      }
    } catch (err) {
      return res
        .status(500)
        .send({ message: "We encountered a problem. Try again later.", err });
    }
    return res.status(200).send(formattedResponse);
  }
  return res.status(404).send({
    message: "I haven't found any details in your image. Please try again.",
  });
};

const verifyToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "Not authorized" });
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    if (ticket) {
      return res.status(200).send({ message: "Token is valid" });
    }
  } catch (err) {
    return res.status(403).send({ message: "Forbidden", err: err });
  }
};
module.exports = {
  detectImage,
  verifyToken,
};

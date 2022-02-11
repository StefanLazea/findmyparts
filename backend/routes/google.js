const router = require('express').Router();
const vision = require('@google-cloud/vision');
const { TranslationServiceClient } = require('@google-cloud/translate');

router.get('/vision', async (req, res) => {
    // Imports the Google Cloud client library

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    // Performs label detection on the image file
    const [result] = await client.labelDetection("/home/stefan/Documents/projects/findmyparts/backend/routes/wakeupcat.jpg");
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));

})

router.get('/translate', async (req, res) => {
    // Instantiates a client
    const translationClient = new TranslationServiceClient();
    const projectId = 'gasestepiesa';
    const location = 'global';
    const text = 'Hello, world!';

    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: 'es',
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
    }
})
module.exports = router;
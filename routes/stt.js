var express = require('express');
var router = express.Router();
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'M0EE5WGy_QamHTDF4dpw3DivIPg5dVhMqyd_U2zh6pSy',
  }),
  url: 'https://gateway-lon.watsonplatform.net/speech-to-text/api',
  disableSslVerification: true,
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	const recognizeParams = {
			  audio: fs.createReadStream('public/audio/audio-file2.flac'),
			  contentType: 'audio/flac',
			  wordAlternativesThreshold: 0.9,
			  keywords: ['colorado', 'tornado', 'tornadoes'],
			  keywordsThreshold: 0.5,
			};
	speechToText.recognize(recognizeParams)
	  .then(speechRecognitionResults => {
	    res.send(JSON.stringify({"status": 200, "error": null, "results": speechRecognitionResults.result.results}));
	  })
	  .catch(err => {
	    res.send(JSON.stringify({"status": 500, "error": err, "results": null})); 
	  });
	
});

module.exports = router;

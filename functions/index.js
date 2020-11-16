const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
// const spawn = require('spawn');
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

const storageConfig = {
	projectId: 'ecommerceprodmockup',
	keyFilename:
		'keys/ecommerceprodmockup-firebase-adminsdk-gujpn-7a43a543d0.json',
};

const storage = new Storage(storageConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		if (req.method !== 'POST') {
			return res.status(500).json({
				message: 'Not allowed',
			});
		}

		const busboy = new Busboy({ headers: req.headers });
		let uploadData = null;

		busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
			const filepath = path.join(os.tmpdir(), filename);
			uploadData = { file: filepath, type: mimetype };
			file.pipe(fs.createWriteStream(filepath));
		});

		busboy.on('finish', () => {
			const bucket = storage.bucket('ecommerceprodmockup.appspot.com');
			bucket
				.upload(uploadData.file, {
					uploadType: 'media',
					metadata: {
						cacheControl: 'public, max-age=31536000',
						metadata: {
							contentType: uploadData.type,
							firebaseStorageDownloadTokens: uuidv4(),
						},
					},
				})
				.then(() => {
					return res.status(200).json({
						message: 'It worked!',
					});
				})
				.catch((err) => {
					res.status(500).json({
						error: err,
					});
				});
		});
		busboy.end(req.rawBody);
	});
});

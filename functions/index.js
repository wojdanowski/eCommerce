const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((req, res) => {
	if (req.method !== 'POST') {
		return res.status(500).json({
			message: 'Not allowed',
		});
	}

	res.status(200).json({
		message: 'It worked!',
	});
});

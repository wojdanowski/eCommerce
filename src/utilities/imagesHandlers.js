import fb from './fb';
const storageRef = fb.storage().ref();

export const uploadImage = async (files, prodId) => {
	let response;
	try {
		response = await Promise.all(
			files.map(
				(file) =>
					new Promise((resolve, reject) => {
						const uploadTask = storageRef
							.child(`${prodId}/${file.name}`)
							.put(file);

						uploadTask.on(
							'state_changed',
							(snapshot) => {},
							(err) => {
								console.log(err);
							},
							async () => {
								let downloadUrl;
								try {
									downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
								} catch (err) {
									console.log(err);
								}
								resolve(downloadUrl);
							}
						);
					})
			)
		);
	} catch (err) {
		console.log(err);
	}
	return response;
};

export const downloadImages = async (images) => {
	const imgRefs = images.map((el) => storageRef.child(el));
	let response;
	try {
		response = await Promise.all(
			imgRefs.map((ref, index) => ref.getDownloadURL())
		);
	} catch (error) {
		switch (error.code) {
			case 'storage/object-not-found':
				// File doesn't exist
				break;

			case 'storage/unauthorized':
				// User doesn't have permission to access the object
				break;

			case 'storage/canceled':
				// User canceled the upload
				break;

			case 'storage/unknown':
				// Unknown error occurred, inspect the server response
				break;

			default:
				console.log(`no such actions`);
		}
	}
	return response;
};

export const listAllFiles = async (prodId) => {
	// Create a reference under which you want to list
	let listRef = storageRef.child(prodId);
	let response;
	try {
		response = await listRef.listAll();
	} catch (err) {
		console.log(err);
	}
	return response;
};

import fb from './fb';

export const uploadImages = async (images, prodId) => {
	console.log(`images uploading`);
	const storageRef = fb.storage().ref();
	// var imgRef = storageRef.child(`${prodId}/${imagesToUpload[0].path}`)
	const imgRefs = images.map((el) =>
		storageRef.child(`${prodId}/${el.path}`)
	);

	try {
		await Promise.all(imgRefs.map((el, index) => el.put(images[index])));
	} catch (err) {
		console.log(err);
	}
	console.log(`finished`);

	// await imgRef.put(imagesToUpload[0]).then(function (snapshot) {
	// 	console.log('Uploaded a blob or file!');
	// });
};

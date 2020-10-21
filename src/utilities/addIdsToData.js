const addIdsToData = (dataObj) => {
	let dataWithIds = {
		...dataObj,
	};
	for (const property in dataObj) {
		dataWithIds[property] = {
			...dataObj[property],
			id: property,
		};
	}
	return dataWithIds;
};

export default addIdsToData;

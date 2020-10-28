const isPresent = (id, array) => {
	const found = array.find((element) => element.id === id);
	return found ? found : false;
};

export default isPresent;

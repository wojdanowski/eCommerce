const isPresent = (id, array) => {
	const found = array.find((element) => element.id === id);
	return found ? true : false;
};

export default isPresent;

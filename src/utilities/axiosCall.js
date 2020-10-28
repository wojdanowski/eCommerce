import axios from 'axios';

const axiosCall = async (url, data, [onSuccess, onError], method = 'get') => {
	// console.log(`[axiosCall]`);
	// console.log(url);
	// console.log(method);
	try {
		const result = await axios({
			method: method.toLocaleLowerCase(),
			url,
			data: {
				...data,
			},
		});
		if (result.data) {
			onSuccess(result.data);
		} else if (!result.data) {
			onSuccess({});
		}
		// console.log(result.data);
	} catch (error) {
		onError(true);
		console.log(error);
	}
};

export default axiosCall;

import axios from 'axios';

const axiosCall = async (url, data, [onSuccess, onError], method = 'get') => {
	try {
		console.log(`[axiosCall]`);
		console.log(url);
		console.log(method);
		const result = await axios({
			method: method.toLocaleLowerCase(),
			url,
			data: {
				...data,
			},
		});
		onSuccess(result.data);
	} catch (error) {
		onError(true);
		console.log(error);
	}
};

export default axiosCall;

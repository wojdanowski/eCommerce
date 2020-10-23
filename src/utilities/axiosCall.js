import axios from 'axios';

const axiosCall = async (url, data, [onSuccess, onError], method = 'get') => {
	try {
		const result = await axios({
			method: method.toLocaleLowerCase(),
			url,
			data: {
				...data,
			},
		});
		console.log(result);
		onSuccess(result.data);
	} catch (error) {
		onError(true);
		console.log(error);
	}
};

export default axiosCall;

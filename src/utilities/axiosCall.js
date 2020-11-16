import axios from 'axios';
import addIdsToData from './addIdsToData';

const axiosCall = async (url, data, [onSuccess, onError], method = 'get') => {
	// console.log(`[axiosCall]`);
	// console.log(`[axiosCall]${url}`);
	// console.log(method);
	try {
		const response = await axios({
			method: method.toLocaleLowerCase(),
			url,
			data: {
				...data,
			},
		});
		if (response.data) {
			const dataWithIds = addIdsToData(response.data);
			onSuccess(dataWithIds);
			return response;
		} else if (!response.data) {
			onSuccess();
			return response;
		}
		// console.log(result.data);
	} catch (error) {
		onError(true);
		console.log(error);
		return error;
	}
};

export default axiosCall;

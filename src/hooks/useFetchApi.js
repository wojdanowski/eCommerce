import { useState, useCallback } from 'react';
import axiosCall from './../utilities/axiosCall';

export const useFetchApi = (
	method,
	[initialUrl, payload = null, headers = null]
) => {
	const [data, setData] = useState();
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	// console.log(url);
	const callFetchApi = useCallback(
		async (providedData, userMethod, userUrl, addToData) => {
			setIsError(false);
			setIsLoading(true);
			const urlToSend = userUrl ? userUrl : url;
			const dataToSend = providedData ? providedData : payload;
			const selectedMethod = userMethod ? userMethod : method;
			const response = await axiosCall(
				urlToSend,
				dataToSend,
				[setData, setIsError],
				selectedMethod
			);
			setIsLoading(false);
			return {
				...response,
				data: {
					...response.data,
					...addToData,
				},
			};
		},
		[url, payload, method]
	);

	return { data, isLoading, isError, callFetchApi, setUrl };
};

export default useFetchApi;

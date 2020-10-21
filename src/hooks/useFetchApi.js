import { useState, useCallback } from 'react';
import axiosCall from './../utilities/axiosCall';

export const useFetchApi = (
	method,
	[initialUrl, payload = null, headers = null]
) => {
	const [data, setData] = useState(payload);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const callFetchApi = useCallback(
		async (providedData) => {
			setIsError(false);
			setIsLoading(true);
			const data = providedData ? providedData : payload;
			await axiosCall(url, data, [setData, setIsError], method);
			setIsLoading(false);
		},
		[url, payload, method]
	);

	return { data, isLoading, isError, callFetchApi, setUrl, setData };
};

export default useFetchApi;

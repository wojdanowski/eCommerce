import { useState, useCallback } from 'react';
import axiosCall from './../utilities/axiosCall';

export const useFetchApi = (
	method,
	[initialUrl, payload = null, headers = null]
) => {
	const [res, setRes] = useState();
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const callFetchApi = useCallback(
		async (providedData) => {
			setIsError(false);
			setIsLoading(true);
			const dataToSend = providedData ? providedData : payload;
			await axiosCall(url, dataToSend, [setRes, setIsError], method);
			setIsLoading(false);
		},
		[url, payload, method]
	);

	return { res, isLoading, isError, callFetchApi, setUrl };
};

export default useFetchApi;

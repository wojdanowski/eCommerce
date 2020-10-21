import { useState, useCallback } from 'react';
import axiosCall from './../utilities/axiosCall';

export const useFetchApi = (
	method,
	[initialUrl, payload = null, headers = null]
) => {
	const [data, setData] = useState(payload);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const callFetchApi = useCallback(async () => {
		setIsError(false);
		setIsLoading(true);
		await axiosCall(url, payload, [setData, setIsError], method);
		setIsLoading(false);
	}, [url, payload, method]);

	return { data, isLoading, isError, callFetchApi, setUrl };
};

export default useFetchApi;

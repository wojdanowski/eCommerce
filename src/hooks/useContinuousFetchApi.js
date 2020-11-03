import { useState, useEffect } from 'react';
import axiosCall from './../utilities/axiosCall';

export const useContinuousFetchApi = (initialUrl, initialData = null) => {
	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			await axiosCall(url, initialData, [setData, setIsError]);
			setIsLoading(false);
		};
		fetchData();
	}, [url, initialData]);
	return { data, isLoading, isError, setUrl };
};

export default useContinuousFetchApi;

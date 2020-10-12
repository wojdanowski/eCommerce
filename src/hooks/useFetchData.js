import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	// const proxy = 'https://cors-anywhere.herokuapp.com/';
	const proxy = '';

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios(`${proxy}${url}`);
				const dataWithIds = {};

				for (const property in result.data) {
					dataWithIds[property] = {
						...result.data[property],
						id: property,
					};
				}
				setData(dataWithIds);
				console.log('[useFetchData] url:');
				console.log(url);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);
	return { data, isLoading, isError, setUrl };
};

export default useDataApi;

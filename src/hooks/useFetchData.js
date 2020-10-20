import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, method = 'GET', initialData = null) => {
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
				const result = await axios({
					method: method.toLocaleLowerCase(),
					url: `${proxy}${url}`,
					data: {
						...initialData,
					},
				});
				setData(result.data);
			} catch (error) {
				setIsError(true);
				alert(error);
				setData(error);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);
	return { data, isLoading, isError, setUrl };
};

export default useDataApi;

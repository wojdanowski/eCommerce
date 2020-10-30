import { useState, useCallback, useEffect } from 'react';
import { getLastItemName, getFirstItemName } from '../utilities/getObjName';

const usePaginationReworked = (url, maxPages, fetchHook, method) => {
	const [maxPerPage, setMaxPerPage] = useState(maxPages + 1);
	const pagination = `&limitToLast=${maxPerPage}`;
	const [isInitial, setIsInitial] = useState(true);
	const [firstItemName, setFirstItemName] = useState();
	const [prevPageDisable, setPrevPageDisable] = useState(false);
	const [nextPageDisable, setNextPageDisable] = useState(false);
	const [filteredData, setFilteredData] = useState();

	const fetchApi = fetchHook(method, [url.concat(pagination)]);

	// Remove last item from fetched data.
	useEffect(() => {
		if (fetchApi.data) {
			let dataArray = [];
			for (const property in fetchApi.data) {
				dataArray.push([property, fetchApi.data[property]]);
			}
			dataArray.reverse();
			console.log(dataArray);

			const lastItem = dataArray[dataArray.length - 1][0];
			console.log(lastItem);

			const shortDataArray = dataArray.map((el) => el);
			shortDataArray.splice(-1, 1);
			console.log(shortDataArray);

			setFilteredData(shortDataArray);
		} else if (!fetchApi.data) {
			setFilteredData();
		}
	}, [fetchApi.data, maxPerPage]);

	// Disable nex and prev page buttons on end pages.
	useEffect(() => {
		if (filteredData && fetchApi.data) {
			const fetchedDataLength = Object.keys(fetchApi.data).length;
			const filteredDataLength = Object.keys(filteredData).length;
			if (isInitial) {
				const firstItem = getFirstItemName(filteredData);
				setFirstItemName(firstItem);
				setPrevPageDisable(true);
				if (filteredDataLength < maxPages) {
					// console.log(`max pages = ${maxPages}`);
					// console.log(
					// 	`[usePaginationReworked] useEffect nexPageDisable true`
					// );
					// console.log(filteredData);
					// console.log(filteredDataLength);
					setNextPageDisable(true);
				}
			} else if (!isInitial) {
				const found = Object.keys(filteredData).find(
					(key) => key === firstItemName
				);
				// console.log(`first item name: ${firstItemName}`);
				// console.log(`found: ${found}`);
				if (found) {
					setPrevPageDisable(true);
					// console.log(`found if`);
					// setIsInitial(true);
				} else {
					setPrevPageDisable(false);
				}
			}

			if (
				filteredDataLength === 0 ||
				fetchedDataLength === filteredDataLength
			) {
				setNextPageDisable(true);
			} else {
				setNextPageDisable(false);
			}
		}
	}, [filteredData, isInitial, fetchApi.data, firstItemName, maxPages]);

	const nextPage = useCallback(() => {
		if (fetchApi.data) {
			setIsInitial(false);
			const pagination = `&limitToFirst=${maxPerPage}&endAt="${getLastItemName(
				fetchApi.data
			)}"`;
			fetchApi.callFetchApi(null, null, url.concat(pagination));
		}
	}, [fetchApi, maxPerPage, url]);

	const prevPage = useCallback(() => {
		if (fetchApi.data) {
			setIsInitial(false);
			const pagination = `&limitToFirst=${maxPerPage}&endAt="${getFirstItemName(
				fetchApi.data
			)}"`;
			fetchApi.callFetchApi(null, null, url.concat(pagination));
		}
	}, [fetchApi, maxPerPage, url]);

	const callPaginated = (
		providedData = null,
		userMethod = method,
		userUrl = null
	) => {
		// console.log(`[usePaginationReworked] userUrl ${userUrl}`);
		// console.log(`[usePaginationReworked] url ${url}`);

		let finalUrl;
		if (userUrl) {
			finalUrl = userUrl.concat(pagination);
		} else if (!userUrl) {
			finalUrl = url.concat(pagination);
		}
		fetchApi.callFetchApi(providedData, userMethod, finalUrl);
		setIsInitial(true);
	};

	return {
		nextPage,
		prevPage,
		setMaxPerPage,
		prevPageDisable,
		nextPageDisable,
		...fetchApi,
		callPaginated,
		data: filteredData,
	};
};

export default usePaginationReworked;

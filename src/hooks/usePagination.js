import { useState, useCallback, useEffect } from 'react';
import { getLastItemName, getFirstItemName } from '../utilities/getObjName';

const usePagination = (url, maxPages, fetchHook, method) => {
	const [maxPerPage, setMaxPerPage] = useState(maxPages + 1);
	const pagination = `&limitToFirst=${maxPerPage}`;
	const [isInitial, setIsInitial] = useState(true);
	const [firstItemName, setFirstItemName] = useState();
	const [prevPageDisable, setPrevPageDisable] = useState(false);
	const [nextPageDisable, setNextPageDisable] = useState(false);
	const [filteredData, setFilteredData] = useState();

	const fetchApi = fetchHook(method, [url.concat(pagination)]);

	// Remove last item from fetched data.
	useEffect(() => {
		if (fetchApi.data) {
			const lastItem = getLastItemName(fetchApi.data);
			const dataKeys = Object.keys(fetchApi.data);
			let filteredData = dataKeys.reduce((object, key) => {
				if (key !== lastItem || dataKeys.length < maxPerPage) {
					object[key] = fetchApi.data[key];
					return object;
				} else {
					return object;
				}
			}, {});
			// console.log(`filteredData = fetchApi.data`);
			// console.log(filteredData);
			setFilteredData({
				...filteredData,
			});
		} else if (!fetchApi.data) {
			// console.log(`no fetchApi.data`);
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
					// 	`[usePagination] useEffect nexPageDisable true`
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
			const pagination = `&limitToFirst=${maxPerPage}&startAt="${getLastItemName(
				fetchApi.data
			)}"`;
			fetchApi.callFetchApi(null, null, url.concat(pagination));
		}
	}, [fetchApi, maxPerPage, url]);

	const prevPage = useCallback(() => {
		if (fetchApi.data) {
			setIsInitial(false);
			const pagination = `&limitToLast=${maxPerPage}&endAt="${getFirstItemName(
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
		// console.log(`[usePagination] userUrl ${userUrl}`);
		// console.log(`[usePagination] url ${url}`);

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
		data: {
			...filteredData,
		},
	};
};

export default usePagination;

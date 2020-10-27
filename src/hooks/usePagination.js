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
			setFilteredData({
				...filteredData,
			});
		}
	}, [fetchApi.data, maxPerPage]);

	// Disable nex and prev page buttons on end pages.
	useEffect(() => {
		if (filteredData) {
			const fetchedDataLength = Object.keys(fetchApi.data).length;
			const filteredDataLength = Object.keys(filteredData).length;
			if (isInitial) {
				const firstItem = getFirstItemName(filteredData);
				setFirstItemName(firstItem);
				setPrevPageDisable(true);
				if (filteredDataLength < maxPages) {
					setNextPageDisable(true);
				}
			} else if (!isInitial) {
				const found = Object.keys(filteredData).find(
					(key) => key === firstItemName
				);
				if (found) {
					setPrevPageDisable(true);
				} else {
					setPrevPageDisable(false);
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

	return {
		nextPage,
		prevPage,
		setMaxPerPage,
		prevPageDisable,
		nextPageDisable,
		...fetchApi,
		data: {
			...filteredData,
		},
	};
};

export default usePagination;

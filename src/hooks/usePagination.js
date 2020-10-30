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
			const shortDataArray = dataArray.map((el) => el);
			if (dataArray.length > maxPages) shortDataArray.splice(-1, 1);
			setFilteredData(shortDataArray);
		} else if (!fetchApi.data) {
			setFilteredData();
		}
	}, [fetchApi.data, maxPages]);

	// Disable nex and prev page buttons on end pages.
	useEffect(() => {
		if (filteredData && fetchApi.data) {
			const fetchedDataLength = Object.keys(fetchApi.data).length;
			if (isInitial) {
				const firstItem = filteredData[0][0];
				setFirstItemName(firstItem);
				setPrevPageDisable(true);
				if (filteredData.length < maxPages) {
					setNextPageDisable(true);
				}
			} else if (!isInitial) {
				const found = filteredData.find(
					(el) => el[0] === firstItemName
				);
				if (found) {
					setPrevPageDisable(true);
				} else {
					setPrevPageDisable(false);
				}
			}

			if (
				filteredData.length === 0 ||
				fetchedDataLength === filteredData.length
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
			console.log(getFirstItemName(fetchApi.data));
			const pagination = `&limitToLast=${maxPerPage}&endAt="${getFirstItemName(
				fetchApi.data
			)}"`;
			fetchApi.callFetchApi(null, null, url.concat(pagination));
		}
	}, [fetchApi, maxPerPage, url]);

	const prevPage = useCallback(() => {
		if (fetchApi.data) {
			setIsInitial(false);
			const pagination = `&limitToFirst=${maxPerPage}&startAt="${getLastItemName(
				fetchApi.data
			)}"`;
			console.log(pagination);
			fetchApi.callFetchApi(null, null, url.concat(pagination));
		}
	}, [fetchApi, maxPerPage, url]);

	const callPaginated = (
		providedData = null,
		userMethod = method,
		userUrl = null
	) => {
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

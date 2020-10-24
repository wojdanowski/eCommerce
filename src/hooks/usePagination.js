import { useState, useCallback, useEffect } from 'react';
import { getLastItemName, getFirstItemName } from '../utilities/getObjName';
import { useContinuousFetchApi } from './useContinuousFetchApi';

const usePagination = (url, maxPages) => {
	const [maxPerPage, setMaxPerPage] = useState(maxPages + 1);
	const [pagination, setPagination] = useState(`&limitToFirst=${maxPerPage}`);
	const [isInitial, setIsInitial] = useState(true);
	const [firstItemName, setFirstItemName] = useState();
	const [prevPageDisable, setPrevPageDisable] = useState(false);
	const [nextPageDisable, setNextPageDisable] = useState(false);
	const [filteredData, setFilteredData] = useState();

	const fetchApi = useContinuousFetchApi(url.concat(pagination));

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
	}, [fetchApi.data, prevPageDisable, nextPageDisable, maxPerPage]);

	useEffect(() => {
		fetchApi.setUrl(url.concat(pagination));
		if (filteredData) {
			const fetchedDataLength = Object.keys(fetchApi.data).length;
			const filteredDataLength = Object.keys(filteredData).length;
			if (isInitial) {
				const firstItem = getFirstItemName(filteredData);
				setFirstItemName(firstItem);
				setPrevPageDisable(true);
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
	}, [
		pagination,
		fetchApi,
		url,
		isInitial,
		maxPerPage,
		firstItemName,
		filteredData,
	]);

	const nextPage = useCallback(() => {
		if (fetchApi.data) {
			setIsInitial(false);
			setPagination(
				`&limitToFirst=${maxPerPage}&startAt="${getLastItemName(
					fetchApi.data
				)}"`
			);
		}
	}, [fetchApi.data, maxPerPage]);

	const prevPage = useCallback(() => {
		if (fetchApi.data) {
			setIsInitial(false);
			setPagination(
				`&limitToLast=${maxPerPage}&endAt="${getFirstItemName(
					fetchApi.data
				)}"`
			);
		}
	}, [fetchApi.data, maxPerPage]);

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

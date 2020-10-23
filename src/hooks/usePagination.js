import { useState, useCallback, useEffect } from 'react';
import { getLastItemName, getFirstItemName } from '../utilities/getObjName';
import { useContinuousFetchApi } from './useContinuousFetchApi';

const usePagination = (url, maxPages) => {
	const [maxPerPage, setMaxPerPage] = useState(maxPages);
	const [pagination, setPagination] = useState(`&limitToFirst=${maxPages}`);
	const [isInitial, setIsInitial] = useState(true);
	const [firstItemName, setFirstItemName] = useState();
	const [prevPageDisable, setPrevPageDisable] = useState(false);
	const [nextPageDisable, setNextPageDisable] = useState(false);

	const fetchApi = useContinuousFetchApi(url.concat(pagination));

	useEffect(() => {
		fetchApi.setUrl(url.concat(pagination));
		if (fetchApi.data) {
			const fetchDataLength = Object.keys(fetchApi.data).length;
			console.log(`fetchDataLength: ${fetchDataLength}`);
			console.log(fetchApi.data);
			if (isInitial) {
				const firstItem = getFirstItemName(fetchApi.data);
				setFirstItemName(firstItem);
				setPrevPageDisable(true);
			} else if (!isInitial) {
				const found = Object.keys(fetchApi.data).find(
					(key) => key === firstItemName
				);
				if (found) {
					setPrevPageDisable(true);
				} else {
					setPrevPageDisable(false);
				}
				if (fetchDataLength < maxPages || fetchDataLength === 0) {
					setNextPageDisable(true);
				} else {
					setNextPageDisable(false);
				}
			}
		}
	}, [pagination, fetchApi, url, isInitial, maxPages, firstItemName]);

	const nextPage = useCallback(() => {
		if (fetchApi.data) {
			console.log(`nex page`);
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
			console.log(`prev page`);
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
	};
};

export default usePagination;

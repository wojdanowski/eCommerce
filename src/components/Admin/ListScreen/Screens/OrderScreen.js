import React, { Fragment, useEffect } from 'react';

import usePagination from './../../../../hooks/usePagination';
import GenericList from './../../../UI/GenericList/GenericList';
import OrderListItem from './../OrderListItem/OrderListItem';
import addIdsToData from './../../../../utilities/addIdsToData';
import Loader from './../../../UI/Loader/Loader';
import PaginationButtons from './../../../UI/PaginationButtons/PaginationButtons';
import { useFetchApi } from './../../../../hooks/useFetchApi';

const OrderScreen = (props) => {
	const maxPerPage = 50;
	const url = `https://ecommerceprodmockup.firebaseio.com/orders.json?orderBy="$key"`;

	let fetchData = usePagination(url, maxPerPage);
	// let fetchData = useFetchApi('get', [url]);
	// const { callFetchApi } = fetchData;

	// useEffect(() => {
	// 	callFetchApi();
	// }, [callFetchApi]);

	console.log(`[OrderScreen]`);

	const ordersData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

	let listContent = null;

	if (ordersData.isLoading) {
		listContent = <Loader />;
	} else if (ordersData.isError) {
		listContent = <p>ERROR</p>;
	} else {
		listContent = (
			<GenericList
				dataArray={Object.values(ordersData.data)}
				displayWith={OrderListItem}
				additional={{
					removeHandler: props.onRemove,
					viewHandler: props.onView,
					confirmHandler: props.onConfirm,
					removedItems: props.removedItems,
				}}
			/>
		);
	}

	return (
		<Fragment>
			{listContent}
			<PaginationButtons
				resetChanges={props.onReset}
				fetchApi={ordersData}
			/>
		</Fragment>
	);
};

export default OrderScreen;

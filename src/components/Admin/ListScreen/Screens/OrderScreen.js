import React, { Fragment, useEffect, useState } from 'react';

import usePagination from './../../../../hooks/usePagination';
import GenericList from './../../../UI/GenericList/GenericList';
import OrderListItem from './../OrderListItem/OrderListItem';
import addIdsToData from './../../../../utilities/addIdsToData';
import Loader from './../../../UI/Loader/Loader';
import PaginationButtons from './../../../UI/PaginationButtons/PaginationButtons';
import { useFetchApi } from './../../../../hooks/useFetchApi';

const OrderScreen = (props) => {
	const maxPerPage = 10;
	const url = `https://ecommerceprodmockup.firebaseio.com/orders.json?orderBy="$key"`;
	const [isUpdated, setIsUpdated] = useState(false);
	let fetchData = usePagination(url, maxPerPage, useFetchApi, 'get');

	const ordersData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};
	useEffect(() => {
		if (!isUpdated) {
			fetchData.callFetchApi();
			setIsUpdated(true);
		}
	}, [isUpdated, fetchData]);

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

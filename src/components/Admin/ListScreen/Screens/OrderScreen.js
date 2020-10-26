import React, { Fragment } from 'react';

import usePagination from './../../../../hooks/usePagination';
import GenericList from './../../../UI/GenericList/GenericList';
import OrderListItem from './../OrderListItem/OrderListItem';
import addIdsToData from './../../../../utilities/addIdsToData';
import Loader from './../../../UI/Loader/Loader';
import PaginationButtons from './../../../UI/PaginationButtons/PaginationButtons';

const OrderScreen = (props) => {
	const maxPerPage = 15;
	const url = `https://ecommerceprodmockup.firebaseio.com/orders.json?orderBy="$key"`;
	let fetchData = usePagination(url, maxPerPage);

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
					removeHandler: props.removeHandler,
					editHandler: props.editHandler,
				}}
			/>
		);
	}

	return (
		<Fragment>
			{listContent}
			<PaginationButtons fetchApi={ordersData} />
		</Fragment>
	);
};

export default OrderScreen;

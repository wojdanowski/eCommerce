import React, { Fragment, useEffect, useState } from 'react';

import classes from './OrderScreen.module.scss';

import { useFetchApi } from './../../../../../hooks/useFetchApi';
import GenericButton from './../../../../UI/Buttons/GenericButton/GenericButton';
import usePagination from '../../../../../hooks/usePagination';
import addIdsToData from './../../../../../utilities/addIdsToData';
import GenericList from './../../../../UI/GenericList/GenericList';
import Loader from './../../../../UI/Loader/Loader';
import PaginationButtons from './../../../../UI/PaginationButtons/PaginationButtons';
import OrderListItem from './../../OrderListItem/OrderListItem';

const OrderScreen = (props) => {
	const maxPerPage = 10;
	const url = `https://ecommerceprodmockup.firebaseio.com/orders.json?orderBy="$key"`;
	let fetchData = usePagination(url, maxPerPage, useFetchApi, 'get');

	const [update, setUpdate] = useState(true);

	const ordersData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

	useEffect(() => {
		if (update) {
			fetchData.callFetchApi();
			console.log(`updating list`);
			setUpdate(false);
		}
	}, [fetchData, update]);

	const saveChangesHandler = async () => {
		await props.onSave();
		fetchData.callFetchApi();
	};
	// console.log(ordersData.data);
	let listContent = null;

	if (ordersData.isLoading || !ordersData.data || update) {
		listContent = <Loader />;
	} else if (ordersData.isError) {
		listContent = <p>ERROR</p>;
	} else {
		listContent = (
			<Fragment>
				<div className={classes.actionButtonsContainer}>
					<h1>ACTIVE Orders</h1>
					<GenericButton
						label={'save'}
						type={'green'}
						clicked={saveChangesHandler}
						isDisabled={props.deletedItems.length ? false : true}
					/>
				</div>
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
				<PaginationButtons
					resetChanges={props.onReset}
					fetchApi={ordersData}
				/>
			</Fragment>
		);
	}

	return <Fragment>{listContent}</Fragment>;
};

export default OrderScreen;

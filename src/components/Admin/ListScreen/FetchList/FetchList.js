import React, { Fragment, useEffect, useState } from 'react';

import classes from './FetchList.module.scss';
import usePagination from './../../../../hooks/usePagination';
import { useFetchApi } from './../../../../hooks/useFetchApi';
import Loader from './../../../UI/Loader/Loader';
import GenericButton from './../../../UI/Buttons/GenericButton/GenericButton';
import PaginationButtons from './../../../UI/PaginationButtons/PaginationButtons';
import GenericList from './../../../UI/GenericList/GenericList';
import OrderListItem from './../ListItem/OrderListItem';
import ProdListItem from './../ListItem/ProdListItem';

const FetchList = (props) => {
	const maxPerPage = 10;
	const [fetchedCollection, setFetchedCollection] = useState(
		props.collection
	);
	const orderBy = `.json?orderBy="$key"`;
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const fullUrl = `${url}${props.collection}${orderBy}`;
	let fetchData = usePagination(fullUrl, maxPerPage, useFetchApi, 'get');

	const [update, setUpdate] = useState(true);

	const { onReset } = props;

	useEffect(() => {
		if (update || props.collection !== fetchedCollection) {
			setFetchedCollection(props.collection);
			fetchData.callPaginated(null, null, fullUrl);
			setUpdate(false);
			onReset();
		}
	}, [
		fetchData,
		update,
		props.collection,
		fetchedCollection,
		onReset,
		fullUrl,
	]);

	const saveChangesHandler = async () => {
		await props.onSave();
		fetchData.callPaginated(null, null, fullUrl);
	};

	let listContent = null;

	if (
		fetchData.isLoading ||
		update ||
		props.collection !== fetchedCollection
	) {
		listContent = <Loader />;
	} else if (fetchData.isError) {
		listContent = <p>ERROR</p>;
	} else {
		let itemsList = null;
		let newProductsList = null;
		let displayListWith = null;

		if (props.collection === 'products') {
			if (props.newItems.length) {
				newProductsList = (
					<Fragment>
						<div className={classes.listHeader}>
							<h1>NEW {props.collection}</h1>
						</div>
						<div className={classes.newProductsListContainer}>
							<GenericList
								displayWith={ProdListItem}
								dataArray={props.newItems}
								additional={{
									viewHandler: props.onView,
									modifyHandler: props.onModify,
									removedItems: props.removedItems,
									modifiedItems: props.modifiedItems,
									collection: props.collection,
								}}
							/>
						</div>
					</Fragment>
				);
			}
			displayListWith = ProdListItem;
		} else if (props.collection === 'orders') {
			displayListWith = OrderListItem;
		} else itemsList = <p>No list of that type</p>;

		itemsList = (
			<GenericList
				displayWith={displayListWith}
				dataArray={fetchData.data}
				additional={{
					viewHandler: props.onView,
					modifyHandler: props.onModify,
					removedItems: props.removedItems,
					modifiedItems: props.modifiedItems,
					collection: props.collection,
				}}
			/>
		);

		listContent = (
			<Fragment>
				{newProductsList}
				<div className={classes.listHeader}>
					<h1>ACTIVE {props.collection}</h1>
					<div className={classes.actionButtonsContainer}>
						<GenericButton
							label={'add'}
							type={
								props.collection === 'products'
									? null
									: 'hidden'
							}
							clicked={props.onNewProduct}
						/>
						<GenericButton
							label={'reset'}
							clicked={props.onReset}
							isDisabled={!props.isModified}
						/>
						<GenericButton
							label={'save'}
							type={'success'}
							clicked={saveChangesHandler}
							isDisabled={!props.isModified}
						/>
					</div>
				</div>
				{itemsList}
				<PaginationButtons
					resetChanges={props.onReset}
					fetchApi={fetchData}
				/>
			</Fragment>
		);
	}

	return <Fragment>{listContent}</Fragment>;
};

export default FetchList;

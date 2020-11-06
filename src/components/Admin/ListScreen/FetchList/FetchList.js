import React, { Fragment, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

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
	const match = useRouteMatch();
	const maxPerPage = 10;
	const [fetchedCollection, setFetchedCollection] = useState(
		props.collection
	);
	const links = {
		products: `${match.url}/products`,
		orders: `${match.url}/orders`,
		newProduct: `${match.url}/newProduct`,
	};
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
	let newProductsList = null;

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
		if (props.collection === 'products') {
			itemsList = (
				<GenericList
					displayWith={ProdListItem}
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
		} else if (props.collection === 'orders') {
			itemsList = (
				<GenericList
					displayWith={OrderListItem}
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
		} else itemsList = <p>No list of that type</p>;

		listContent = (
			<Fragment>
				{newProductsList}
				<div className={classes.listHeader}>
					<h1>ACTIVE {props.collection}</h1>
					<div className={classes.actionButtonsContainer}>
						<GenericButton
							label={'add product'}
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

import React, { Fragment, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import classes from './FetchList.module.scss';
import usePagination from './../../../../hooks/usePagination';
import { useFetchApi } from './../../../../hooks/useFetchApi';
import Loader from './../../../UI/Loader/Loader';
import addIdsToData from './../../../../utilities/addIdsToData';
import GenericButton from './../../../UI/Buttons/GenericButton/GenericButton';
import PaginationButtons from './../../../UI/PaginationButtons/PaginationButtons';
import GenericList from './../../../UI/GenericList/GenericList';
import OrderListItem from './../ListItem/OrderListItem';
import ProdListItem from './../ListItem/ProdListItem';

const FetchList = (props) => {
	const match = useRouteMatch();
	const maxPerPage = 15;
	const [fetchedCollection, setFetchedCollection] = useState(
		props.collection
	);
	const links = {
		products: `${match.url}/products`,
		orders: `${match.url}/orders`,
	};
	const orderBy = `.json?orderBy="$key"`;
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const fullUrl = `${url}${props.collection}${orderBy}`;
	let fetchData = usePagination(fullUrl, maxPerPage, useFetchApi, 'get');

	const [update, setUpdate] = useState(true);

	const dataWithIds = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

	useEffect(() => {
		if (update || props.collection !== fetchedCollection) {
			setFetchedCollection(props.collection);
			fetchData.callPaginated(null, null, fullUrl);
			setUpdate(false);
			props.onReset();
		}
	}, [fetchData, update, props.collection, fetchedCollection, fullUrl]);

	const saveChangesHandler = async () => {
		await props.onSave();
		fetchData.callPaginated(null, null, fullUrl);
	};
	let listContent = null;

	if (
		dataWithIds.isLoading ||
		update ||
		props.collection !== fetchedCollection
	) {
		listContent = <Loader />;
	} else if (dataWithIds.isError) {
		listContent = <p>ERROR</p>;
	} else {
		const dataArray = Object.values(dataWithIds.data);
		listContent = (
			<Fragment>
				<div className={classes.listHeader}>
					<h1>ACTIVE {props.collection}</h1>
					<div className={classes.actionButtonsContainer}>
						<GenericButton
							label={'reset'}
							clicked={props.onReset}
							isDisabled={props.isModified}
						/>
						<GenericButton
							label={'save'}
							type={'green'}
							clicked={saveChangesHandler}
							isDisabled={props.isModified}
						/>
					</div>
				</div>
				<Switch>
					<Route path={links.products}>
						<GenericList
							displayWith={ProdListItem}
							dataArray={dataArray}
							additional={{
								removeHandler: props.onRemove,
								viewHandler: props.onView,
								modifyHandler: props.onModify,
								removedItems: props.removedItems,
								modifiedItems: props.modifiedItems,
							}}
						/>
					</Route>

					<Route path={links.orders}>
						<GenericList
							displayWith={OrderListItem}
							dataArray={dataArray}
							additional={{
								removeHandler: props.onRemove,
								viewHandler: props.onView,
								modifyHandler: props.onModify,
								removedItems: props.removedItems,
								modifiedItems: props.modifiedItems,
								collection: props.collection,
							}}
						/>
					</Route>
				</Switch>

				<PaginationButtons
					resetChanges={props.onReset}
					fetchApi={dataWithIds}
				/>
			</Fragment>
		);
	}

	return <Fragment>{listContent}</Fragment>;
};

export default FetchList;

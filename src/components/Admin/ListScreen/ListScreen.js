import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import classes from './ListScreen.module.scss';
import { useFetchApi } from './../../../hooks/useFetchApi';

import isPresent from './../../../utilities/isPresent';
import GenericList from './../../UI/GenericList/GenericList';
import FetchList from './FetchList/FetchList';
import OrderListItem from './ListItem/OrderListItem';
import ProdListItem from './ListItem/ProdListItem';

const ListScreen = ({ match }) => {
	const location = useLocation();
	const links = {
		products: `${match.url}/products`,
		orders: `${match.url}/orders`,
	};

	const getCollectionName = () => {
		return location.pathname.replace('/admin/', '');
	};

	const [deletedItems, setDeletedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const removeApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);

	const removeHandler = (data) => {
		const isElementPresent = isPresent(data.id, deletedItems);
		if (!isElementPresent) {
			setDeletedItems((prevState) =>
				prevState.concat({
					...data,
					action: 'delete',
					collection: getCollectionName(),
				})
			);
		} else if (isElementPresent) {
			const updatedArray = deletedItems.filter((el) => el.id !== data.id);
			setDeletedItems(updatedArray);
		}
	};

	const editHandler = () => {
		console.log(`[ListScreen] edit`);
	};

	const viewHandler = () => {
		console.log(`[ListScreen] view`);
	};

	const confirmOrderHandler = () => {
		console.log(`[ListScreen] confirmOrder`);
	};

	const resetHandler = () => {
		if (deletedItems.length) {
			setDeletedItems([]);
		}
	};

	const saveHandler = async () => {
		if (deletedItems.length) {
			try {
				await Promise.all(
					deletedItems.map((el) => {
						return removeApi.callFetchApi(
							null,
							el.action,
							url.concat(getCollectionName(), `/${el.id}.json`)
						);
					})
				);
			} catch (err) {
				console.log(err);
			}
			resetHandler();
		}
	};

	return (
		<div className={classes.prodScreenContainer}>
			<Switch>
				<Route path={links.products}>
					<FetchList
						collection={getCollectionName()}
						deletedItems={deletedItems}
						onSave={saveHandler}
						onReset={resetHandler}
					>
						<GenericList
							displayWith={ProdListItem}
							additional={{
								removeHandler,
								viewHandler,
								confirmOrderHandler,
								removedItems: deletedItems.filter(
									(el) => el.action === 'delete'
								),
							}}
						/>
					</FetchList>
				</Route>

				<Route path={links.orders}>
					<FetchList
						collection={getCollectionName()}
						deletedItems={deletedItems}
						onSave={saveHandler}
						onReset={resetHandler}
					>
						<GenericList
							displayWith={OrderListItem}
							additional={{
								removeHandler,
								viewHandler,
								confirmOrderHandler,
								removedItems: deletedItems.filter(
									(el) => el.action === 'delete'
								),
							}}
						/>
					</FetchList>
				</Route>
			</Switch>
		</div>
	);
};

export default ListScreen;

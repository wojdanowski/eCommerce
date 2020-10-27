import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import GenericButton from '../../UI/Buttons/GenericButton/GenericButton';

import classes from './ListScreen.module.scss';
import { useFetchApi } from './../../../hooks/useFetchApi';

import OrderScreen from './Screens/OrderScreen';
import ProductsScreen from './Screens/ProductsScreen';
import isPresent from './../../../utilities/isPresent';

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
		console.log(`reseting`);
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
			window.location.reload();
		}
	};

	return (
		<div className={classes.prodScreenContainer}>
			<Switch>
				<Route path={links.products}>
					<div className={classes.actionButtonsContainer}>
						<h1>ACTIVE PRODUCTS</h1>
						<GenericButton
							label={'save'}
							type={'green'}
							clicked={saveHandler}
						/>
					</div>
					<ProductsScreen
						onReset={resetHandler}
						onView={viewHandler}
						onRemove={removeHandler}
						onEdit={editHandler}
						removedItems={deletedItems.filter(
							(el) => el.action === 'delete'
						)}
					/>
				</Route>

				<Route path={links.orders}>
					<div className={classes.actionButtonsContainer}>
						<h1>ACTIVE Orders</h1>
						<GenericButton
							label={'save'}
							type={'green'}
							clicked={saveHandler}
							isDisabled={deletedItems.length ? false : true}
						/>
					</div>
					<OrderScreen
						onReset={resetHandler}
						onRemove={removeHandler}
						onView={viewHandler}
						onConfirm={confirmOrderHandler}
						removedItems={deletedItems.filter(
							(el) => el.action === 'delete'
						)}
					/>
				</Route>
			</Switch>
		</div>
	);
};

export default ListScreen;

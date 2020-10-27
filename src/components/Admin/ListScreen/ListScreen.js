import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import GenericButton from '../../UI/Buttons/GenericButton/GenericButton';

import classes from './ListScreen.module.scss';
import { useFetchApi } from './../../../hooks/useFetchApi';

import OrderScreen from './Screens/OrderScreen';
import ProductsScreen from './Screens/ProductsScreen';
import isPresent from './../../../utilities/isPresent';

const ListScreen = ({ match }) => {
	const links = {
		products: `${match.url}/products`,
		orders: `${match.url}/orders`,
	};
	const [deletedItems, setDeletedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json`;
	const location = useLocation();

	const getCollectionName = () => {
		return location.pathname.replace('/admin/', '');
	};
	const removeApi = useFetchApi('delete', url);

	const removeHandler = (data) => {
		console.log(`[ListScreen] remove`);
		console.log(data);
		const isElementPresent = isPresent(data.id, deletedItems);
		if (!isElementPresent) {
			console.log(`is Not Present`);
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

	return (
		<div className={classes.prodScreenContainer}>
			<Switch>
				<Route path={links.products}>
					<div className={classes.actionButtonsContainer}>
						<h1>ACTIVE PRODUCTS</h1>
						<GenericButton label={'save'} type={'green'} />
					</div>
					<ProductsScreen
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
						<GenericButton label={'save'} type={'green'} />
					</div>
					<OrderScreen
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

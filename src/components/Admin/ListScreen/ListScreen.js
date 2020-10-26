import React from 'react';
import { Switch, Route } from 'react-router-dom';

import classes from './ListScreen.module.scss';

import OrderScreen from './Screens/OrderScreen';
import ProductsScreen from './Screens/ProductsScreen';

const ListScreen = ({ match }) => {
	const links = {
		products: `${match.url}/products`,
		orders: `${match.url}/orders`,
	};

	const removeHandler = (data) => {
		console.log(`[ListScreen] remove`);
		console.log(data);
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
					<h1>ACTIVE PRODUCTS</h1>
					<ProductsScreen
						onView={viewHandler}
						onRemove={removeHandler}
						onEdit={editHandler}
					/>
				</Route>

				<Route path={links.orders}>
					<h1>ACTIVE ORDERS</h1>
					<OrderScreen
						onRemove={removeHandler}
						onView={viewHandler}
						onConfirm={confirmOrderHandler}
					/>
				</Route>
			</Switch>
		</div>
	);
};

export default ListScreen;

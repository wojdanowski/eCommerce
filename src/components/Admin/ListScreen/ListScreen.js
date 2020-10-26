import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import addIdsToData from '../../../utilities/addIdsToData';
import classes from './ListScreen.module.scss';
import GenericList from '../../UI/GenericList/GenericList';

import GenericButton from '../../UI/Buttons/GenericButton/GenericButton';
import usePagination from '../../../hooks/usePagination';
import ProdListItem from './ProdListItem/ProdListItem';

const ListScreen = ({ match }) => {
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	const location = useLocation();
	let fetchData = usePagination(url, 10);

	const prodData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
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

	return (
		<div className={classes.prodScreenContainer}>
			<Switch>
				<Route path={`${match.url}/products`}>
					<h1>ACTIVE PRODUCTS</h1>
					<GenericList
						dataArray={Object.values(prodData.data)}
						displayWith={ProdListItem}
						additional={{
							removeHandler,
							editHandler,
						}}
					/>
				</Route>
				{/* <Route path={`${match.url}/orders`} exact={true}>
					<h1>ACTIVE ORDERS</h1>
					<GenericList
						dataArray={Object.values(prodData.data)}
						displayWith={ListItem}
						additional={{
							listOf: ProdDescription,
							tools: [
								{handler: }
							],
							removeHandler: () =>
								console.log(`[ListScreen] remove`),
						}}
					/>
				</Route> */}
			</Switch>

			<div className={classes.buttonsContainer}>
				<GenericButton
					label={'< Previous Page'}
					clicked={prodData.prevPage}
					isDisabled={prodData.prevPageDisable}
				/>
				<GenericButton
					label={'Next Page >'}
					clicked={prodData.nextPage}
					isDisabled={prodData.nextPageDisable}
				/>
			</div>
		</div>
	);
};

export default ListScreen;

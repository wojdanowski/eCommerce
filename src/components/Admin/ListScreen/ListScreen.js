import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import addIdsToData from '../../../utilities/addIdsToData';
import classes from './ListScreen.module.scss';
import GenericList from '../../UI/GenericList/GenericList';

import GenericButton from '../../UI/Buttons/GenericButton/GenericButton';
import usePagination from '../../../hooks/usePagination';
import ProdListItem from './ProdListItem/ProdListItem';

const ListScreen = ({ match }) => {
	const links = {
		products: `${match.url}/products`,
		orders: `${match.url}/orders`,
	};

	const location = useLocation();
	const maxPerPage = 10;
	const [selectedList, setSelectedList] = useState();

	useEffect(() => {
		console.log('useEffect');
		switch (location.pathname) {
			case links.products: {
				setSelectedList('products');
				break;
			}
			case links.orders: {
				setSelectedList('orders');
				break;
			}
			default: {
			}
		}
	}, [links.orders, links.products, location.pathname]);

	const url = `https://ecommerceprodmockup.firebaseio.com/${selectedList}.json?orderBy="$key"`;
	let fetchData = usePagination(url, maxPerPage);

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
				<Route path={links.products}>
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
				<Route path={links.orders}>
					<h1>ACTIVE Orders</h1>
					{/* <GenericList
						dataArray={Object.values(prodData.data)}
						displayWith={ProdListItem}
						additional={{
							removeHandler,
							editHandler,
						}}
					/> */}
				</Route>
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

import React, { useEffect, useState } from 'react';

import { useFetchApi } from './../../../hooks/useFetchApi';
import addIdsToData from './../../../utilities/addIdsToData';

import classes from './OrderDetailsPage.module.scss';
import OrderDescription from './../ListScreen/ListItem/OrderDescription';
import ListItem from './../ListScreen/ListItem/ListItem';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';
import GenericList from './../../UI/GenericList/GenericList';
import ProdListItem from './../ListScreen/ListItem/ProdListItem';
import Loader from './../../UI/Loader/Loader';

const OrderDetailsPage = (props) => {
	const { orderData } = props;
	const url = `https://ecommerceprodmockup.firebaseio.com/products/`;
	let fetchedProducts = useFetchApi('get', '');
	const [prodArray, setProdArray] = useState([]);
	const dataWithIds = {
		...fetchedProducts,
		data: {
			...addIdsToData(fetchedProducts.data),
		},
	};

	useEffect(() => {
		console.log(`[useEffect]`);
		if (!fetchedProducts.data && !dataWithIds.isLoading) {
			let response;
			const fetchAllProds = async () => {
				try {
					response = await Promise.all(
						orderData.products.map((el) => {
							return fetchedProducts.callFetchApi(
								null,
								null,
								`${url}${el.id}.json`,
								{ id: el.id }
							);
						})
					);
				} catch (err) {
					console.log(err);
				}
				setProdArray(response.map((el) => el.data));
			};
			fetchAllProds();
		}
	}, [fetchedProducts, dataWithIds.isLoading, url, orderData.products]);

	let productsList = null;

	if (prodArray.length !== orderData.products.length) {
		productsList = <Loader />;
	} else if (dataWithIds.isError) {
		productsList = <p>ERROR</p>;
	} else {
		productsList = (
			<GenericList
				displayWith={ProdListItem}
				dataArray={prodArray}
				additional={{
					removedItems: [],
					modifiedItems: [],
				}}
			/>
		);
	}

	return (
		<div className={classes.container}>
			<div className={classes.head}>
				<h1>Order id: {orderData.id}</h1>
				<div className={classes.buttonContainer}>
					<GenericButton
						label='confirm'
						// clicked={() => props.addProdToCart(props.prodData)}
						// isDisabled={!props.isPurchasable}
					/>
					<GenericButton
						label='remove'
						// clicked={() => props.addProdToCart(props.prodData)}
						// isDisabled={!props.isPurchasable}
					/>
				</div>
			</div>
			<div className={classes.orderSummary}>
				<h3>Order summary</h3>
				<ListItem>
					<OrderDescription itemData={orderData} />
				</ListItem>
			</div>
			<div className={classes.prodList}>
				<h3>Ordered Products:</h3>
				{productsList}
			</div>
		</div>
	);
};

export default OrderDetailsPage;

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
	// console.log(orderData);
	const orderBy = `.json?orderBy="$key"`;
	const url = `https://ecommerceprodmockup.firebaseio.com/products/`;
	let fetchedProducts = useFetchApi('get', [url]);
	const [prodArray, setProdArray] = useState([]);
	// console.log(fetchedProducts.data);
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

	if (dataWithIds.isLoading) {
		productsList = <Loader />;
	} else if (dataWithIds.isError) {
		productsList = <p>ERROR</p>;
	} else {
		const dataArray = Object.values(dataWithIds.data);
		productsList = <p>prodListContent</p>;
	}

	return (
		<div className={classes.container}>
			<div className={classes.head}>
				<h1>Order id: {orderData.id}</h1>
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

			<div className={classes.description}>
				<h3>Order summary</h3>
				<ListItem>
					<OrderDescription itemData={orderData} />
				</ListItem>
				<h3>Ordered Products:</h3>
				{/* <GenericList
							displayWith={ProdListItem}
							dataArray={dataArray}
							additional={{
								viewHandler: props.onView,
								modifyHandler: props.onModify,
								removedItems: props.removedItems,
								modifiedItems: props.modifiedItems,
								collection: props.collection,
							}}
						/> */}
			</div>
		</div>
	);
};

export default OrderDetailsPage;

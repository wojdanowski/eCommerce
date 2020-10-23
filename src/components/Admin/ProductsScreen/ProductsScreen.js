import React, { useState } from 'react';

import addIdsToData from './../../../utilities/addIdsToData';
import useContinuousFetchApi from '../../../hooks/useContinuousFetchApi';
import classes from './ProductsScreen.module.scss';
import GenericList from './../../UI/GenericList/GenericList';
import CheckoutItem from './../../Checkout/CheckoutItem/CheckoutItem';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const ProductScreen = () => {
	const maxProdsOnPage = 5;
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	const [pagination, setPagination] = useState(
		`&limitToFirst=${maxProdsOnPage}`
	);
	let fetchData = useContinuousFetchApi(url.concat(pagination));

	const prodData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

	return (
		<div className={classes.prodScreenContainer}>
			<h1>ACTIVE PRODUCTS</h1>
			<p>Lorem, ipsum dolor sit</p>
			<GenericList
				dataArray={Object.values(prodData.data)}
				displayWith={CheckoutItem}
				additional={{ removeHandler: () => console.log(`remove`) }}
			/>
			<div className={classes.buttonsContainer}>
				<GenericButton
					label={'< Previous Page'}
					// clicked={() => paginateHandler(false)}
				/>
				<GenericButton
					label={'Next Page >'}
					// clicked={() => paginateHandler()}
				/>
			</div>
		</div>
	);
};

export default ProductScreen;

import React from 'react';
import classes from './ProductPage.module.scss';

const ProductPage = (props) => {
	console.log(props.prodData);
	return (
		<div className={classes.prodPageContainer}>
			<p>{props.prodData.name}</p>
			<p>{props.prodData.price}</p>
			<p>{props.prodData.oldPrice}</p>
		</div>
	);
};

export default ProductPage;

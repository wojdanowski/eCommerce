import React from 'react';
import classes from './ProductPage.module.scss';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';

const ProductPage = (props) => {
	return (
		<div className={classes.prodPageContainer}>
			<div className={classes.firstRow}>
				<div className={classes.imgGalleryContainer}>img gallery</div>
				<div className={classes.shortDescription}>
					<h1>{props.prodData.name}</h1>
					<h3>PRICE: {props.prodData.price}</h3>
					<h4>OLD PRICE: {props.prodData.oldPrice}</h4>
					<p>{props.prodData.shortDescription}</p>
					<GenericButton label='Add To Cart' />
				</div>
			</div>
			<div className={classes.fullDescription}>
				<p>{props.prodData.fullDescription}</p>
			</div>
		</div>
	);
};

export default ProductPage;

import React from 'react';
import productImg from '../../../assets/img/product.jpg';
import classes from './ProdCard.module.scss';

const ProdCard = () => {
	return (
		<div className={classes.productCard}>
			<div className={classes.soldTag}>
				<span>Sold</span>
			</div>
			<div className={classes.prodImgContainer}>
				<img
					className={classes.productImg}
					src={productImg}
					alt='prodImg'
				/>
			</div>
			<div className={classes.prodDescription}>
				<h4>Super Spodnie</h4>
				<div className={classes.productPrice}>
					<span className={classes.beforePrice}>99.99 zł</span>
					<span className={classes.newPrice}>20.99 zł</span>
				</div>
				<a href='index.html' className={classes.regularButton}>
					BUTTON
				</a>
			</div>
		</div>
	);
};

export default ProdCard;

import React from 'react';
import { connect } from 'react-redux';
import * as cartActionTypes from '../../store/actions/cartActions';
import classes from './ProdCard.module.scss';
import GenericButton from '../UI/Buttons/GenericButton/GenericButton';

const ProdCard = (props) => {
	const soldTag = (
		<div className={classes.soldTag}>
			<span>Sold</span>
		</div>
	);

	return (
		<div className={classes.productCard}>
			{props.productInfo.isSold && soldTag}
			<div
				className={classes.prodImgContainer}
				onClick={() => props.clicked(props.productInfo.id)}
			>
				{props.productInfo.images ? (
					<img
						className={classes.productImg}
						src={props.productInfo.images[0]}
						alt='prodImg'
					/>
				) : (
					<p>No Image!</p>
				)}
			</div>
			<div className={classes.prodDescription}>
				<h4>{props.productInfo.name}</h4>
				<div className={classes.productPrice}>
					<span className={classes.beforePrice}>
						{props.productInfo.oldPrice.toFixed(2)} $
					</span>
					<span className={classes.newPrice}>
						{props.productInfo.price.toFixed(2)} $
					</span>
				</div>
				<GenericButton
					label='Add To Cart'
					clicked={() => props.addProdToCart(props.productInfo)}
				/>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addProdToCart: (productInfo) =>
			dispatch({
				type: cartActionTypes.ADD_ITEM_TO_CART,
				product: productInfo,
			}),
	};
};

export default connect(null, mapDispatchToProps)(ProdCard);

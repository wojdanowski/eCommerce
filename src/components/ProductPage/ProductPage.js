import React from 'react';
import { connect } from 'react-redux';
import * as cartActionTypes from '../../store/actions/cartActions';
import classes from './ProductPage.module.scss';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';
import ProdGallery from './../ProdGallery/ProdGallery';

const ProductPage = (props) => {
	return (
		<div className={classes.prodPageContainer}>
			<div className={classes.firstRow}>
				<div className={classes.imgGalleryContainer}>
					<ProdGallery />
				</div>
				<div className={classes.description}>
					<div className={classes.shortDescription}>
						<div className={classes.nameAndPrice}>
							<h1>{props.prodData.name}</h1>
							<h3>PRICE: {props.prodData.price}</h3>
							<h4 className='textLineThrough'>
								OLD PRICE: {props.prodData.oldPrice}
							</h4>
							<p>{props.prodData.shortDescription}</p>
						</div>
						<GenericButton
							label='Add To Cart'
							clicked={() => props.addProdToCart(props.prodData)}
						/>
					</div>
					<div className={classes.fullDescription}>
						<p>{props.prodData.fullDescription}</p>
					</div>
				</div>
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

export default connect(null, mapDispatchToProps)(ProductPage);

import React from 'react';
import classes from './CartItem.module.scss';
import prodImg from '../../../assets/img/product.jpg';

const CartItem = (props) => {
	return (
		<div className={`${classes.cartItemContainer}`}>
			<div className={classes.prodImgContainer}>
				<img className={classes.prodImg} src={prodImg} alt='prodImg' />
			</div>

			<div className={classes.prodDescription}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quam id, officia quas ipsa suscipit ipsam.
				</p>
				<div className={classes.cartItemRemove}>REMOVE</div>
			</div>
		</div>
	);
};

export default CartItem;

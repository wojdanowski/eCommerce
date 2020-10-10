import React from 'react';
import classes from './CartItem.module.scss';
import prodImg from '../../../assets/img/product.jpg';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const CartItem = (props) => {
	return (
		<div className={`${classes.cartItemContainer}`}>
			<div className={classes.prodImgContainer}>
				<img className={classes.prodImg} src={prodImg} alt='prodImg' />
			</div>

			<div className={classes.prodDescription}>
				<div className={classes.text}>
					<h3>Item name</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quam id, officia quas ipsa suscipit ipsam.
					</p>
				</div>
				<div className={classes.tools}>
					<GenericButton label='remove' />
				</div>
			</div>
		</div>
	);
};

export default CartItem;

import React from 'react';
import classes from './CartItem.module.scss';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const CartItem = (props) => {
	return (
		<div className={`${classes.cartItemContainer}`}>
			<div className={classes.prodImgContainer}>
				<img
					className={classes.prodImg}
					src={props.prodData.thumb}
					alt='prodImg'
				/>
			</div>

			<div className={classes.prodDescription}>
				<div className={classes.text}>
					<h3>{props.prodData.name}</h3>
					<p>{props.prodData.shortDescription}</p>
				</div>
				<div className={classes.tools}>
					<GenericButton
						label='remove'
						clicked={() => props.removeHandler(props.prodData.id)}
					/>
				</div>
			</div>
		</div>
	);
};

export default CartItem;

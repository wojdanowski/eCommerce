import React from 'react';

import classes from './CheckoutItem.module.scss';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const CheckoutItem = (props) => {
	return (
		<div className={classes.itemContainer}>
			<div className={classes.imgContainer}>
				<img
					className={classes.prodImg}
					src={props.itemData.thumb}
					alt='prodImg'
				/>
			</div>
			<div className={classes.descriptionArea}>
				<div>
					<h3>{props.itemData.name}</h3>
					<p>{props.itemData.shortDescription}</p>
				</div>
				<div className={classes.priceBox}>
					<p>
						Price: {parseInt(props.itemData.price, 10).toFixed(2)}{' '}
						USD
					</p>
				</div>
			</div>
			<GenericButton
				label='remove'
				clicked={() => props.additional.removeHandler(props.itemData)}
			/>
		</div>
	);
};

export default CheckoutItem;

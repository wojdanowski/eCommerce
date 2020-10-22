import React from 'react';

import classes from './CheckoutItem.module.scss';
import IconButton from './../../UI/Buttons/IconButton/IconButton';
import { FiTrash2 } from 'react-icons/fi';

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
					<span className={classes.shortDescription}>
						<p>{props.itemData.shortDescription}</p>
					</span>
				</div>
				<div className={classes.priceBox}>
					<p>
						Price: {parseInt(props.itemData.price, 10).toFixed(2)}{' '}
						USD
					</p>
				</div>
			</div>
			<IconButton
				clicked={() => props.additional.removeHandler(props.itemData)}
				icon={<FiTrash2 />}
			/>
		</div>
	);
};

export default CheckoutItem;

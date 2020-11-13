import React from 'react';
import ListItem from './ListItem';
import classes from './ShippingInfoItem.module.scss';

const ShippingInfoItem = (props) => {
	return (
		<ListItem>
			<div className={classes.shippingContainer}>
				<p>{Object.keys(props.itemData)[0]}</p>
				<p>{Object.values(props.itemData)[0]}</p>
			</div>
		</ListItem>
	);
};

export default ShippingInfoItem;

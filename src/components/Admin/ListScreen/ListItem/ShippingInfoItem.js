import React from 'react';
import ListItem from './ListItem';

const ShippingInfoItem = (props) => {
	return (
		<ListItem>
			<p>{Object.keys(props.itemData)[0]}</p>
			<p>{Object.values(props.itemData)[0]}</p>
		</ListItem>
	);
};

export default ShippingInfoItem;

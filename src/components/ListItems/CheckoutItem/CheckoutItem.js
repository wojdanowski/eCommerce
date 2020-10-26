import React from 'react';

import classes from './CheckoutItem.module.scss';
import IconButton from '../../UI/Buttons/IconButton/IconButton';
import { FiTrash2 } from 'react-icons/fi';
import ProdDescription from '../ProdDescription/ProdDescription';

const CheckoutItem = (props) => {
	return (
		<div className={classes.itemContainer}>
			<ProdDescription itemData={props.itemData} />
			<IconButton
				clicked={() => props.additional.removeHandler(props.itemData)}
				icon={<FiTrash2 />}
			/>
		</div>
	);
};

export default CheckoutItem;

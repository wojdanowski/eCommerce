import React from 'react';
import classes from './GenericList.module.scss';

const GenericList = (props) => {
	const ListItem = props.displayWith;
	const content = props.dataArray.map((arrayItem, index) => (
		<li
			key={arrayItem.id ? arrayItem.id : index}
			className={classes.genericListItem}
		>
			<ListItem itemData={arrayItem} additional={props.additional} />
		</li>
	));
	return <div className={classes.genericList}>{content}</div>;
};

export default GenericList;

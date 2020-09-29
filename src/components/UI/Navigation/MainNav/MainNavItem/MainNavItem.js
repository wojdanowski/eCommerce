import React from 'react';
import classes from './MainNavItem.module.scss';

const MainNavItem = (props) => {
	let isCurrentClass;
	props.isCurrent
		? (isCurrentClass = classes.currentLink)
		: (isCurrentClass = null);

	return (
		<li className={classes.navItem}>
			<a
				href={props.link}
				className={isCurrentClass}
				onClick={props.clicked}
			>
				{props.label}
			</a>
		</li>
	);
};

export default MainNavItem;

import React from 'react';
import classes from './MainNavItem.module.scss';

const MainNavItem = (props) => {
	let isCurrentClass;
	props.isCurrent
		? (isCurrentClass = classes.currentLink)
		: (isCurrentClass = null);

	let appendClass = '';

	props.direction === 'vertical'
		? (appendClass = classes.vertical)
		: (appendClass = classes.horizontal);

	return (
		<li className={`${classes.navItem} ${appendClass}`}>
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

import React from 'react';
import classes from './MainNavItem.module.scss';
import { useHistory, NavLink } from 'react-router-dom';

const MainNavItem = (props) => {
	const history = useHistory();
	// let isCurrentClass;
	// props.active
	// 	? (isCurrentClass = classes.currentLink)
	// 	: (isCurrentClass = null);

	let appendClass = '';

	props.direction === 'vertical'
		? (appendClass = classes.vertical)
		: (appendClass = classes.horizontal);

	return (
		<li className={`${classes.navItem} ${appendClass}`}>
			<NavLink
				to={props.link}
				exact={props.exact}
				activeClassName={classes.active}
			>
				{props.label}
			</NavLink>
		</li>
	);
};

export default MainNavItem;

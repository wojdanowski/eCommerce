import React from 'react';
import classes from './MainNavItem.module.scss';
import { NavLink } from 'react-router-dom';

const MainNavItem = (props) => {
	let appendClass = '';

	props.direction === 'vertical'
		? (appendClass = classes.vertical)
		: (appendClass = classes.horizontal);

	return (
		<li
			className={`${classes.navItem} ${appendClass}`}
			onClick={props.clicked}
		>
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

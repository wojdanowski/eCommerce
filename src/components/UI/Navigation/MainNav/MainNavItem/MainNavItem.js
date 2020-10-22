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

	const clickedHandler = (event) => {
		event.preventDefault();
		if (props.clicked) {
			props.clicked();
		} else {
			if (props.link) {
				history.push(props.link);
			} else console.log(`No link specified in component`);
		}
	};

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

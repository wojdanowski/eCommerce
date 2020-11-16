import React from 'react';
import classes from './MainNav.module.scss';

const MainNav = (props) => {
	let appendClass = '';

	props.direction === 'vertical'
		? (appendClass = classes.vertical)
		: (appendClass = '');

	return (
		<div className={`${classes.navItems} ${appendClass}`}>
			<ul>{props.children}</ul>
		</div>
	);
};

export default MainNav;

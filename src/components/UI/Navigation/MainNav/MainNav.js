import React from 'react';
import classes from './MainNav.module.scss';
import MainNavItem from './MainNavItem/MainNavItem';

const MainNav = () => {
	return (
		<div className={classes.navItems}>
			<ul>
				<MainNavItem />
				<MainNavItem />
				<MainNavItem />
			</ul>
		</div>
	);
};

export default MainNav;

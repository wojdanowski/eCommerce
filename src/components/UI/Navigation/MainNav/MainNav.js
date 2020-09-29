import React from 'react';
import classes from './MainNav.module.scss';
import MainNavItem from './MainNavItem/MainNavItem';

const MainNav = (props) => {
	return (
		<div className={classes.navItems}>
			<ul>
				<MainNavItem link='index.html' label='Home' isCurrent={true} />
				<MainNavItem
					link='index.html'
					label='Basket'
					clicked={props.toggleRightSidebar}
				/>
			</ul>
		</div>
	);
};

export default MainNav;

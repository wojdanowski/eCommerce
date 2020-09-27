import React from 'react';
import classes from './MainNavItem.module.scss';

const MainNavItem = (props) => {
	return (
		<li className={classes.navItem}>
			<a href='index.html' className={classes.currentLink}>
				about
			</a>
		</li>
	);
};

export default MainNavItem;

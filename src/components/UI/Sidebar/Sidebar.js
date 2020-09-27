import React from 'react';
import classes from './Sidebar.module.scss';
import CloseButton from './../Buttons/CloseButton/CloseButton';
import Categories from './../../Categories/Categories';
import MainNav from './../Navigation/MainNav/MainNav';

const Sidebar = () => {
	return (
		<div
			className={`${classes.sidebarContainer} ${classes.right} ${classes.opened}`}
		>
			<div className={classes.sidebarContent}>
				<CloseButton />
				<MainNav />
				<Categories />
			</div>
		</div>
	);
};

export default Sidebar;

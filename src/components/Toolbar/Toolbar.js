import React from 'react';
import classes from './Toolbar.module.scss';
import HamburgerButton from '../UI/Buttons/HamburgerButton/HamburgerButton';
import MainNav from './../UI/Navigation/MainNav/MainNav';

const Toolbar = () => {
	return (
		<div className={classes.toolbar}>
			<div className={classes.toolbarContainer}>
				<HamburgerButton />
				<MainNav />
			</div>
		</div>
	);
};

export default Toolbar;

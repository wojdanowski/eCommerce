import React from 'react';
import classes from './Toolbar.module.scss';
import HamburgerButton from '../UI/Buttons/HamburgerButton/HamburgerButton';
import MainNav from './../UI/Navigation/MainNav/MainNav';

const Toolbar = (props) => {
	return (
		<div className={classes.toolbar}>
			<div className={classes.toolbarContainer}>
				<HamburgerButton clicked={props.toggleSidebar} />
				<div className='hideOnMobile'>
					<MainNav />
				</div>
			</div>
		</div>
	);
};

export default Toolbar;

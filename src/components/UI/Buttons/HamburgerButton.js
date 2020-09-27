import React from 'react';
import classes from './HamburgerButton.module.scss';

const HamburgerButton = (props) => {
	return (
		<div className={classes.DrawerToggle} onClick={props.clicked}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default HamburgerButton;

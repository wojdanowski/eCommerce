import React from 'react';
import classes from './HamburgerButton.module.scss';

const HamburgerButton = (props) => {
	const visibility = props.visible ? null : 'invisible';
	return (
		<div
			className={`${classes.hamburgerContainer} ${visibility}`}
			onClick={props.clicked}
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default HamburgerButton;

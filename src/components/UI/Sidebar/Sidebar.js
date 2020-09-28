import React from 'react';
import classes from './Sidebar.module.scss';
import CloseButton from './../Buttons/CloseButton/CloseButton';

const Sidebar = (props) => {
	let side;
	let visibility;

	props.side === 'left' ? (side = classes.left) : (side = classes.right);
	props.isOpen
		? (visibility = classes.opened)
		: (visibility = classes.closed);

	let attachedClasses = [classes.sidebarContainer, side, visibility];

	return (
		<div className={attachedClasses.join(' ')}>
			<div className={classes.sidebarContent}>
				<CloseButton clicked={props.toggleSidebar} />
				{props.children}
			</div>
		</div>
	);
};

export default Sidebar;

import React from 'react';
import classes from './MainNav.module.scss';
import MainNavItem from './MainNavItem/MainNavItem';
import { RiShoppingBasket2Line, RiUser3Line } from 'react-icons/ri';
import IconButton from './../../Buttons/IconButton/IconButton';

const MainNav = (props) => {
	let appendClass = '';

	props.direction === 'vertical'
		? (appendClass = classes.vertical)
		: (appendClass = '');

	return (
		<div className={`${classes.navItems} ${appendClass}`}>
			<ul>
				<MainNavItem
					link='/'
					label='Home'
					// active={true}
					direction={props.direction}
					exact
				/>
				<IconButton
					clicked={props.toggleRightSidebar}
					icon={<RiShoppingBasket2Line />}
				/>
				<IconButton
					clicked={props.toggleRightSidebar}
					icon={<RiUser3Line />}
				/>
			</ul>
		</div>
	);
};

export default MainNav;

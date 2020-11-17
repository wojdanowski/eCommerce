import React, { Fragment } from 'react';
import classes from './Toolbar.module.scss';
import HamburgerButton from '../UI/Buttons/HamburgerButton/HamburgerButton';
import MainNav from './../UI/Navigation/MainNav/MainNav';
import MainNavItem from './../UI/Navigation/MainNav/MainNavItem/MainNavItem';
import IconButton from './../UI/Buttons/IconButton/IconButton';
import { RiShoppingBasket2Line, RiUser3Line } from 'react-icons/ri';

const Toolbar = (props) => {
	return (
		<div className={classes.toolbar}>
			<div className={classes.toolbarContainer}>
				<HamburgerButton clicked={props.toggleLeftSidebar} />
				<MainNav>
					<MainNavItem
						link='/'
						label={props.isAdmin ? 'SHOP' : 'Home'}
						exact
					/>
					<IconButton
						isHidden={props.isAdmin}
						clicked={props.toggleRightSidebar}
						icon={<RiShoppingBasket2Line />}
					/>
					{props.isLoggedIn && !props.isAdmin && (
						<MainNavItem link='/admin' exact label='Admin' />
					)}
					{props.isLoggedIn ? (
						<Fragment>
							<MainNavItem link='/logout' exact label='Logout' />
						</Fragment>
					) : (
						<MainNavItem
							link='/auth'
							exact
							label={<IconButton icon={<RiUser3Line />} />}
						/>
					)}
				</MainNav>
			</div>
		</div>
	);
};

export default Toolbar;

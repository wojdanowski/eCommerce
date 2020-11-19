import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import * as uiActionTypes from '../../store/actions/uiActions';

import classes from './DashboardLayout.module.scss';
import Toolbar from './../../components/Toolbar/Toolbar';
import Footer from './../../components/UI/Footer/Footer';
import MainNavItem from './../../components/UI/Navigation/MainNav/MainNavItem/MainNavItem';
import Sidebar from './../../components/UI/Sidebar/Sidebar';
import MainNav from './../../components/UI/Navigation/MainNav/MainNav';

const DashboardLayout = (props) => {
	const linkHandler = () => {
		if (props.leftSidebarVisible) props.toggleLeftSidebar();
	};

	return (
		<Fragment>
			<Sidebar
				side='left'
				isOpen={props.leftSidebarVisible}
				toggleSidebar={props.toggleLeftSidebar}
			>
				<MainNav direction='vertical'>
					<MainNavItem
						clicked={linkHandler}
						link='/admin/orders'
						label={'Orders'}
						direction={props.direction}
						exact
					/>

					<MainNavItem
						clicked={linkHandler}
						link='/admin/products'
						label={'Products'}
						direction={props.direction}
						exact
					/>
				</MainNav>
			</Sidebar>
			<div className={classes.dashboard}>
				<div className={classes.dashboardHeadNav}>
					<Toolbar
						isAdmin={true}
						toggleLeftSidebar={props.toggleLeftSidebar}
						isLoggedIn={props.token ? true : false}
					/>
				</div>
				<div className={classes.dashboardSideToolbar}>
					<MainNavItem
						link='/admin/orders'
						label={'Orders'}
						direction={props.direction}
						exact
					/>

					<MainNavItem
						link='/admin/products'
						label={'Products'}
						direction={props.direction}
						exact
					/>
				</div>
				<div
					className={`${classes.dashboardScreenContainer} utilContainer`}
				>
					{props.children}
				</div>
				<div className={classes.dashboardFooterArea}>
					<Footer />
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		leftSidebarVisible: state.uiState.sidebars.leftSidebarVisible,
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleLeftSidebar: () =>
			dispatch({ type: uiActionTypes.TOGGLE_LEFT_SIDEBAR }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);

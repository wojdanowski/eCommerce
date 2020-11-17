import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as uiActionTypes from '../../store/actions/uiActions';
import * as authActions from '../../store/actions/authActions';

import Toolbar from './../../components/Toolbar/Toolbar';
import Sidebar from './../../components/UI/Sidebar/Sidebar';
import Categories from './../../components/Categories/Categories';
import Footer from './../../components/UI/Footer/Footer';
import Cart from '../../components/Cart/Cart';

const Layout = (props) => {
	return (
		<Fragment>
			<Sidebar
				side='left'
				isOpen={props.leftSidebarVisible}
				toggleSidebar={props.toggleLeftSidebar}
			>
				<Categories />
			</Sidebar>
			<Sidebar
				side='right'
				isOpen={props.rightSidebarVisible}
				toggleSidebar={props.toggleRightSidebar}
			>
				<Cart />
			</Sidebar>

			<Toolbar
				toggleLeftSidebar={props.toggleLeftSidebar}
				toggleRightSidebar={props.toggleRightSidebar}
				isLoggedIn={props.token ? true : false}
				logoutUser={() => {
					props.setUserData(null, null);
					alert('User logged out!');
				}}
			/>
			<main>{props.children}</main>
			<Footer />
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		leftSidebarVisible: state.uiState.sidebars.leftSidebarVisible,
		rightSidebarVisible: state.uiState.sidebars.rightSidebarVisible,
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleLeftSidebar: () =>
			dispatch({ type: uiActionTypes.TOGGLE_LEFT_SIDEBAR }),
		toggleRightSidebar: () =>
			dispatch({ type: uiActionTypes.TOGGLE_RIGHT_SIDEBAR }),
		setUserData: (token, userId) =>
			dispatch({ type: authActions.SET_USER_DATA, token, userId }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

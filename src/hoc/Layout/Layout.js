import React from 'react';
import { connect } from 'react-redux';

import Aux from './../Auxiliary/Auxiliary';
import Toolbar from './../../components/Toolbar/Toolbar';
import Sidebar from './../../components/UI/Sidebar/Sidebar';
import MainNav from './../../components/UI/Navigation/MainNav/MainNav';
import Categories from './../../components/Categories/Categories';
import Footer from './../../components/UI/Footer/Footer';
import * as uiActionTypes from '../../store/actions/uiActions';

const Layout = (props) => {
	return (
		<Aux>
			<Sidebar
				side='left'
				isOpen={props.leftSidebarVisible}
				toggleSidebar={props.toggleLeftSidebar}
			>
				<MainNav toggleRightSidebar={props.toggleRightSidebar} />
				<Categories />
			</Sidebar>
			<Sidebar
				side='right'
				isOpen={props.rightSidebarVisible}
				toggleSidebar={props.toggleRightSidebar}
			>
				<p>Basket</p>
			</Sidebar>

			<Toolbar toggleSidebar={props.toggleLeftSidebar} />
			<main>{props.children}</main>
			<Footer />
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		leftSidebarVisible: state.leftSidebarVisible,
		rightSidebarVisible: state.rigthSidebarVisible,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleLeftSidebar: () =>
			dispatch({ type: uiActionTypes.TOGGLE_LEFT_SIDEBAR }),
		toggleRightSidebar: () =>
			dispatch({ type: uiActionTypes.TOGGLE_RIGHT_SIDEBAR }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

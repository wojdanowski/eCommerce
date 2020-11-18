import React, { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './app.scss';
import HomeRouter from './HomeRouter';
import DashboardRouter from './DashboardRouter';
import Auth from './Auth/Auth';
import * as authActions from './../store/actions/authActions';

function App(props) {
	const { loadAuthData } = props;

	useEffect(() => {
		console.log(`[App.js] load auth data`);
		loadAuthData();
	}, [loadAuthData]);

	return (
		<BrowserRouter>
			<Switch>
				<Route path='/admin' component={DashboardRouter} />
				<Route path='/auth' component={Auth} />
				<Route path='/' component={HomeRouter} />
			</Switch>
		</BrowserRouter>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadAuthData: (token, userId) =>
			dispatch({ type: authActions.LOAD_USER_DATA_FROM_STORAGE }),
	};
};

export default connect(null, mapDispatchToProps)(App);

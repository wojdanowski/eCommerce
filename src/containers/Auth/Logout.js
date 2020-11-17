import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/authActions';

const Logout = (props) => {
	const { setUserData } = props;

	useEffect(() => {
		setUserData(null, null);
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
	}, [setUserData]);

	return <Redirect to='/' />;
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.authState.isLoading,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setUserData: (token, userId) =>
			dispatch({ type: authActions.SET_USER_DATA, token, userId }),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);

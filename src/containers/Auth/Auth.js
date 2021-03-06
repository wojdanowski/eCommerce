import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import classes from './Auth.module.scss';
import * as formActions from '../../store/actions/formActions';
import * as authActions from '../../store/actions/authActions';
import { firebaseConfig } from '../../secrets/firebaseConfig';

import Input from './../../components/UI/Input/Input';
import GenericButton from './../../components/UI/Buttons/GenericButton/GenericButton';
import Loader from './../../components/UI/Loader/Loader';

const Auth = (props) => {
	let history = useHistory();
	const [signingUp, setSigningUp] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const key = firebaseConfig.apiKey;
	const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
	const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

	const inputChangedHandler = (event, inputId) => {
		props.updateFormField(event.target.value, inputId, 'auth');
	};

	const logout = () => {
		alert('User logged out!');
		props.setUserData(null, null);
	};

	const checkAuthTimeout = (expirationTime) => {
		setTimeout(() => {
			logout();
		}, expirationTime * 1000);
	};

	const authFail = (err) => {
		setErrorMsg(err.data.error.message.split('_').join(' '));
		props.setIsLoading(false);
	};

	const authSuccess = (res) => {
		props.setIsLoading(false);
		props.setUserData(res.data.idToken, res.data.localId);
		checkAuthTimeout(res.data.expiresIn);
		const expirationDate = new Date(
			new Date().getTime() + res.data.expiresIn * 1000
		);
		localStorage.setItem('token', res.data.idToken);
		localStorage.setItem('expirationDate', expirationDate);
		localStorage.setItem('userId', res.data.localId);
		history.push('/admin');
	};

	const logInClickedHandler = (event) => {
		event.preventDefault();
		props.setIsLoading(true);
		setErrorMsg(null);
		const authData = {
			email: props.formFields.email.value,
			password: props.formFields.password.value,
			returnSecureToken: true,
		};
		const url = signingUp ? signUpUrl : signInUrl;
		axios
			.post(url, authData)
			.then((response) => {
				authSuccess(response);
			})
			.catch((err) => {
				authFail(err.response);
			});
	};

	const formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	const content = props.isLoading ? (
		<Loader />
	) : (
		<Fragment>
			<form className='utilMarBot_05' onSubmit={inputChangedHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) =>
							inputChangedHandler(event, formElement.id)
						}
					/>
				))}
			</form>
			<span
				className={classes.logOrRegisterInfo}
				onClick={() => setSigningUp((prevState) => !prevState)}
			>
				{/* {signingUp ? <p>Sign In</p> : <p>Sign Up</p>} */}
			</span>
			<div className={classes.buttonsContainer}>
				<GenericButton
					label='< back'
					clicked={() => history.goBack()}
				/>
				<GenericButton
					label='Ok'
					isDisabled={!props.formIsValid}
					clicked={logInClickedHandler}
				/>
			</div>
		</Fragment>
	);

	return (
		<div className={classes.authContainer}>
			<div className={classes.formContainer}>
				<h1>Admin</h1>
				<h1>Sign In</h1>
				{/* {signingUp ? (
					<h1>Sign Up</h1>
				) : (
					<h1>Sign In</h1>
				)} */}
				<p className={classes.errorMsg}>{errorMsg && errorMsg}</p>
				{content}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formFields: state.formState.authForm.fields,
		formIsValid: state.formState.authForm.formIsValid,
		isLoading: state.authState.isLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateFormField: (enteredValue, selectedInputId, form) =>
			dispatch({
				type: formActions.UPDATE_FIELD,
				newValue: enteredValue,
				inputId: selectedInputId,
				form: form,
			}),
		setIsLoading: (loading) =>
			dispatch({ type: authActions.SET_IS_LOADING, loading }),
		setUserData: (token, userId) =>
			dispatch({ type: authActions.SET_USER_DATA, token, userId }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

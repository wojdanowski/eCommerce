import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classes from './Auth.module.scss';
import * as formActions from '../../store/actions/formActions';

import Input from './../../components/UI/Input/Input';
import GenericButton from './../../components/UI/Buttons/GenericButton/GenericButton';

const Auth = (props) => {
	let history = useHistory();

	const inputChangedHandler = (event, inputId) => {
		props.updateFormField(event.target.value, inputId, 'auth');
	};

	const formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	return (
		<div className={classes.authContainer}>
			<div className={classes.formContainer}>
				<h1>Sign in</h1>
				<form
					className='utilMarBot_1'
					// onSubmit={orderSubmitHandler}
				>
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
				<div className={classes.buttonsContainer}>
					<GenericButton
						label='< back'
						clicked={() => history.goBack()}
					/>
					<GenericButton
						label='LogIn'
						isDisabled={!props.formIsValid}
						// clicked={orderSubmitHandler}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formFields: state.formState.authForm.fields,
		formIsValid: state.formState.authForm.formIsValid,
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

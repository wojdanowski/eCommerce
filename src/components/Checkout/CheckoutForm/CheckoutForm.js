import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as checkoutFormActions from '../../../store/actions/checkoutFormActions';

import classes from './CheckoutForm.module.scss';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';
import Input from '../../UI/Input/Input';

const CheckoutForm = (props) => {
	let history = useHistory();

	const formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	const inputChangedHandler = (event, inputId) => {
		props.updateFormField(event.target.value, inputId);
	};

	const orderSubmitHandler = (event) => {
		event.preventDefault();
		const formData = props.getAllFormData();
	};

	let form = (
		<form className='utilMarBot_1' onSubmit={orderSubmitHandler}>
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
			{/* <Button btnType='Success' clicked={this.orderHandler}>
				ORDER
			</Button> */}
		</form>
	);

	return (
		<div className={`${classes.formContainer} utilBigContainer`}>
			<h1>Shipping Address:</h1>
			<div className={`${classes.inputsContainer}`}>
				{form}
				<div className='genericFlexRow'>
					<GenericButton
						label='< back'
						clicked={() => history.push('/checkout')}
					/>
					<GenericButton
						label='confirm'
						isDisabled={!props.formIsValid}
						clicked={() => history.push('/checkout')}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formFields: state.checkoutFormState.orderForm,
		isOrderLoading: state.checkoutFormState.isLoading,
		formIsValid: state.checkoutFormState.formIsValid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIsLoading: () =>
			dispatch({ type: checkoutFormActions.SET_IS_LOADING }),
		getAllFormData: () =>
			dispatch({ type: checkoutFormActions.GET_CONTACT_INFO }),
		updateFormField: (enteredValue, selectedInputId) =>
			dispatch({
				type: checkoutFormActions.UPDATE_FIELD,
				newValue: enteredValue,
				inputId: selectedInputId,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

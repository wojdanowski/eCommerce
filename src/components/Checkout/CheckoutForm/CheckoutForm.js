import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as checkoutFormActions from '../../../store/actions/checkoutFormActions';
import axios from 'axios';

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
		props.setIsLoading(true);
		const formData = {};
		for (let inputId in props.formFields) {
			formData[inputId] = props.formFields[inputId].value;
		}
		const shortProdList = [];
		props.prodsInCart.forEach((el) =>
			shortProdList.push({
				id: el.id,
				shortDescription: el.shortDescription,
				price: el.price,
			})
		);
		const query = 'https://ecommerceprodmockup.firebaseio.com/orders.json';
		const order = {
			products: {
				...shortProdList,
			},
			contact: {
				...formData,
			},
		};
		axios
			.post(query, order)
			.then((response) => {
				props.setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				props.setIsLoading(false);
			});
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
						clicked={orderSubmitHandler}
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
		prodsInCart: state.cartState.products,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIsLoading: (isLoading) =>
			dispatch({ type: checkoutFormActions.SET_IS_LOADING, isLoading }),
		updateFormField: (enteredValue, selectedInputId) =>
			dispatch({
				type: checkoutFormActions.UPDATE_FIELD,
				newValue: enteredValue,
				inputId: selectedInputId,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

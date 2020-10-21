import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as checkoutFormActions from '../../../store/actions/checkoutFormActions';

import { useFetchApi } from './../../../hooks/useFetchApi';
import classes from './CheckoutForm.module.scss';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';
import Input from '../../UI/Input/Input';
import Loader from './../../UI/Loader/Loader';

const CheckoutForm = (props) => {
	let history = useHistory();
	const url = 'https://ecommerceprodmockup.firebaseio.com/orders.json';
	const fetchApi = useFetchApi('post', [url]);

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

		const order = {
			products: {
				...shortProdList,
			},
			contact: {
				...formData,
			},
		};
		fetchApi.callFetchApi(order);
	};

	let form;

	if (!fetchApi.data && !fetchApi.isLoading && !fetchApi.isError) {
		form = (
			<Fragment>
				<h1>Shipping Address:</h1>
				<div className={`${classes.inputsContainer}`}>
					<form
						className='utilMarBot_1'
						onSubmit={orderSubmitHandler}
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
					<div className='genericFlexRow'>
						<GenericButton
							label='< back'
							clicked={() => history.push('/checkout')}
						/>
						<GenericButton
							label='confirm'
							// isDisabled={!props.formIsValid}
							clicked={orderSubmitHandler}
						/>
					</div>
				</div>
			</Fragment>
		);
	} else if (fetchApi.isLoading && !fetchApi.isError) {
		form = <Loader />;
	} else if (fetchApi.isError) {
		form = <p>error proceeding your order</p>;
		console.log(fetchApi.data);
	} else {
		form = <p>SUCCESS</p>;
	}

	return (
		<div className={`${classes.formContainer} utilBigContainer`}>
			{form}
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

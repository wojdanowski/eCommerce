import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as formActions from '../../store/actions/formActions';
import * as cartActions from '../../store/actions/cartActions';

import { useFetchApi } from '../../hooks/useFetchApi';
import classes from './CheckoutForm.module.scss';
import GenericButton from '../../components/UI/Buttons/GenericButton/GenericButton';
import Input from '../../components/UI/Input/Input';
import Loader from '../../components/UI/Loader/Loader';

const CheckoutForm = (props) => {
	let history = useHistory();
	const url = 'https://ecommerceprodmockup.firebaseio.com/orders.json';
	const fetchApi = useFetchApi('post', [url]);
	const clearCart = props.clearCart;

	useEffect(() => {
		if (!fetchApi.isLoading && !fetchApi.isError && fetchApi.data) {
			clearCart();
		}
	}, [fetchApi.data, fetchApi.isError, fetchApi.isLoading, clearCart]);

	const formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	const inputChangedHandler = (event, inputId) => {
		props.updateFormField(event.target.value, inputId, 'order');
	};

	const orderSubmitHandler = (event) => {
		event.preventDefault();
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
		// const timestamp = (Date.now() / 1000).toFixed(2) * 1;
		const order = {
			products: {
				...shortProdList,
			},
			contact: {
				...formData,
			},
			processed: false,
			// '.priority': timestamp,
			// timestamp: timestamp,
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
							isDisabled={!props.formIsValid}
							clicked={orderSubmitHandler}
						/>
					</div>
				</div>
			</Fragment>
		);
	} else if (fetchApi.isLoading && !fetchApi.isError) {
		form = <Loader />;
	} else if (fetchApi.isError) {
		form = (
			<Fragment>
				<h1>Error proceeding your order</h1>
				<div className='genericFlexRow'>
					<GenericButton
						label='< back'
						clicked={() => history.push('/checkout')}
					/>
				</div>
			</Fragment>
		);
	} else {
		form = (
			<Fragment>
				<h1>SUCCESS</h1>
				<div className='genericFlexRow'>
					<GenericButton
						label='Continue shopping'
						clicked={() => history.push('/')}
					/>
				</div>
			</Fragment>
		);
	}

	return (
		<div
			className={`${classes.formContainer} utilBigContainer utilContainer utilMarBot_1`}
		>
			{form}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formFields: state.formState.orderForm.fields,
		formIsValid: state.formState.orderForm.formIsValid,
		prodsInCart: state.cartState.products,
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
		clearCart: () => dispatch({ type: cartActions.CLEAR_CART }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

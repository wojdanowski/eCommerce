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

	let form = (
		<form>
			{formElementsArray.map((formElement) => (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					// changed={event =>
					// 	this.inputChangedHandler(event, formElement.id)
					// }
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
			<div className={`${classes.inputsContainer} utilMarBot_1`}>
				{form}
				<div className='genericFlexRow'>
					<GenericButton
						label='< back'
						clicked={() => history.push('/checkout')}
					/>
					<GenericButton
						label='confirm'
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIsLoading: () =>
			dispatch({ type: checkoutFormActions.SET_IS_LOADING }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

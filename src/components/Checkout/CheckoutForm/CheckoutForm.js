import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as checkoutFormActions from '../../../store/actions/checkoutFormActions';

import classes from './CheckoutForm.module.scss';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';
import Input from '../../UI/Input/Input';

const CheckoutForm = () => {
	let history = useHistory();

	// const formElementsArray = [];
	// for (let key in this.state.orderForm) {
	// 	formElementsArray.push({
	// 		id: key,
	// 		config: this.state.orderForm[key],
	// 	});
	// }

	return (
		<div className={`${classes.formContainer} utilBigContainer`}>
			<h1>Shipping Address:</h1>
			<div className={`${classes.inputsContainer} utilMarBot_1`}>
				<Input />
			</div>
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
	);
};

// const mapStateToProps = (state) => {
// 	return {
// 		prodsInCart: state.cartState.products,
// 		cartIsEmpty: state.cartState.cartIsEmpty,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		removeProdFromCart: (productData) =>
// 			dispatch({
// 				type: checkoutFormActions.REM_ITEM_FROM_CART,
// 				product: productData,
// 			}),
// 		loadCartFromStorage: () =>
// 			dispatch({
// 				type: checkoutFormActions.LOAD_CART_FROM_STORAGE,
// 			}),
// 		toggleRightSidebar: () =>
// 			dispatch({ type: checkoutFormActions.TOGGLE_RIGHT_SIDEBAR }),
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
export default CheckoutForm;

import * as actionTypes from '../actions/checkoutFormActions';

const initialState = {
	orderForm: {
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name',
			},
			value: '',
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street',
			},
			value: '',
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code',
			},
			value: '',
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country',
			},
			value: '',
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your E-Mail',
			},
			value: '',
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' },
				],
			},
			value: '',
		},
	},
	loading: false,
};

const checkoutFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IS_LOADING:
			return state;

		case actionTypes.UPDATE_FIELD:
			// const newInputValue = state.orderForm[action.inputId].value;
			const updatedInput = {
				...state.orderForm[action.inputId],
				value: action.newValue,
			};

			const updatedState = {
				...state,
				orderForm: {
					...state.orderForm,
					[action.inputId]: {
						...updatedInput,
					},
				},
			};

			return updatedState;

		default:
			return state;
	}
};

export default checkoutFormReducer;

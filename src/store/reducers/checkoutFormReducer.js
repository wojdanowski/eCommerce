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
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code',
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your E-Mail',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
	},
	loading: false,
	formIsValid: false,
};

const checkValidity = (value, rules) => {
	let isValid = true;
	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	}

	return isValid;
};

const checkoutFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IS_LOADING:
			return state;

		case actionTypes.GET_CONTACT_INFO:
			const formData = {};
			for (let inputId in state.orderForm) {
				formData[inputId] = state.orderForm[inputId].value;
			}
			return formData;

		case actionTypes.UPDATE_FIELD:
			const updatedInput = {
				...state.orderForm[action.inputId],
				value: action.newValue,
				touched: true,
				valid: checkValidity(
					action.newValue,
					state.orderForm[action.inputId].validation
				),
			};

			let updatedState = {
				...state,
				orderForm: {
					...state.orderForm,
					[action.inputId]: {
						...updatedInput,
					},
				},
			};

			let formIsValidAfterUpdate = true;
			for (let inputIdentifier in updatedState.orderForm) {
				formIsValidAfterUpdate =
					updatedState.orderForm[inputIdentifier].valid &&
					formIsValidAfterUpdate;
			}

			return {
				...updatedState,
				formIsValid: formIsValidAfterUpdate,
			};

		default:
			return state;
	}
};

export default checkoutFormReducer;

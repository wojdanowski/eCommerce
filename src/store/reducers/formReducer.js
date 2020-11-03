import * as actionTypes from '../actions/checkoutFormActions';
import orderFormFields from './formFields/orderFormFields';

const initialState = {
	orderForm: {
		fields: { ...orderFormFields },
		formIsValid: false,
	},
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

const formReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_FIELD:
			let selectedForm;
			let keyName;
			switch (action.form) {
				case 'order': {
					keyName = 'orderForm';
					selectedForm = { orderForm: { ...state.orderForm } };
					console.log(selectedForm);
					break;
				}
				default:
					break;
			}
			const updatedInput = {
				...selectedForm[keyName].fields[action.inputId],
				value: action.newValue,
				touched: true,
				valid: checkValidity(
					action.newValue,
					selectedForm[keyName].fields[action.inputId].validation
				),
			};

			let formIsValidAfterUpdate = true;
			for (let inputIdentifier in selectedForm[keyName].fields) {
				formIsValidAfterUpdate =
					selectedForm[keyName].fields[inputIdentifier].valid &&
					formIsValidAfterUpdate;
			}

			let updatedState = {
				...state,

				[keyName]: {
					...selectedForm[keyName],
					formIsValid: formIsValidAfterUpdate,
					fields: {
						...selectedForm[keyName].fields,
						[action.inputId]: {
							...updatedInput,
						},
					},
				},
			};

			return {
				...updatedState,
			};

		default:
			return state;
	}
};

export default formReducer;

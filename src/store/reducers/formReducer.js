import * as actionTypes from '../actions/formActions';
import orderFormFields from './formFields/orderFormFields';
import prodEditFormFields from './formFields/prodEditFormFields';
import logInFormFields from './formFields/logInFormFields';

const initialState = {
	orderForm: {
		fields: { ...orderFormFields },
		formIsValid: false,
	},
	prodEditForm: {
		fields: { ...prodEditFormFields },
		formIsValid: false,
		formIsEdited: false,
	},

	logInForm: {
		fields: { ...logInFormFields },
		formIsValid: false,
		formIsEdited: false,
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
		const pattern = /^\d*\.?\d+$/;
		isValid = pattern.test(value) && isValid;
	}

	return isValid;
};

const formReducer = (state = initialState, action) => {
	let selectedForm;
	let selectedFormName;
	switch (action.form) {
		case 'order': {
			selectedFormName = 'orderForm';
			selectedForm = { orderForm: { ...state.orderForm } };

			break;
		}
		case 'prodEditForm': {
			selectedFormName = 'prodEditForm';
			selectedForm = { prodEditForm: { ...state.prodEditForm } };
			break;
		}
		default:
			break;
	}

	switch (action.type) {
		case actionTypes.UPDATE_FIELD: {
			let isEdited = false;
			let initialFormData = null;
			const existingInitialData =
				selectedForm[selectedFormName].fields[action.inputId]
					.initialData;

			if (action.isInitial) {
				initialFormData = action.newValue;
			} else if (!action.isInitial && existingInitialData) {
				initialFormData = existingInitialData;
			} else if (!existingInitialData) {
				initialFormData = null;
			}

			if (!action.isInitial && existingInitialData) {
				isEdited =
					action.newValue === existingInitialData ? false : true;
			} else if (!action.isInitial && !existingInitialData) {
				isEdited = action.newValue !== '' ? true : false;
			}

			const updatedInput = {
				...selectedForm[selectedFormName].fields[action.inputId],
				value: action.newValue,
				touched: action.isInitial ? false : true,
				initialData: initialFormData,
				isEdited,
				valid: checkValidity(
					action.newValue,
					selectedForm[selectedFormName].fields[action.inputId]
						.validation
				),
			};

			let formIsValidAfterUpdate = true;
			let formIsEditedAfterUpdate = false;

			for (let inputIdentifier in selectedForm[selectedFormName].fields) {
				let isFieldValid =
					selectedForm[selectedFormName].fields[inputIdentifier]
						.valid;
				let isFieldEdited =
					selectedForm[selectedFormName].fields[inputIdentifier]
						.isEdited;
				// check other fields
				if (!action.isInitial) {
					if (inputIdentifier === action.inputId) {
						continue;
					}
					formIsEditedAfterUpdate = isFieldEdited
						? true
						: formIsEditedAfterUpdate;

					formIsValidAfterUpdate =
						isFieldValid && formIsValidAfterUpdate;
				}
			}

			// check field that is edited
			if (!action.isInitial) {
				formIsEditedAfterUpdate = updatedInput.isEdited
					? true
					: formIsEditedAfterUpdate;

				formIsValidAfterUpdate =
					updatedInput.valid && formIsValidAfterUpdate;
			}

			let updatedState = {
				...state,

				[selectedFormName]: {
					...selectedForm[selectedFormName],
					formIsValid: formIsValidAfterUpdate,
					formIsEdited: formIsEditedAfterUpdate,
					fields: {
						...selectedForm[selectedFormName].fields,
						[action.inputId]: {
							...updatedInput,
						},
					},
				},
			};

			return {
				...updatedState,
			};
		}
		case actionTypes.CLEAR_FORM: {
			const updatedState = {
				...state,
				[selectedFormName]: {
					...initialState[selectedFormName],
				},
			};
			return {
				...updatedState,
			};
		}

		default:
			return state;
	}
};

export default formReducer;

const logInFormFields = {
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
	password: {
		elementType: 'input',
		elementConfig: {
			type: 'password',
			placeholder: 'Password',
		},
		value: '',
		validation: {
			required: true,
			minLength: 6,
		},
		valid: false,
		touched: false,
	},
};

export default logInFormFields;

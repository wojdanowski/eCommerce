const authFormFields = {
	email: {
		elementType: 'input',
		elementConfig: {
			type: 'email',
			// placeholder: 'Your E-Mail',
			placeholder: 'admin@admin.com',
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
			// placeholder: 'Password',
			placeholder: '123456',
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

export default authFormFields;

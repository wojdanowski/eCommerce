const authFormFields = {
	searchQuery: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Search',
		},
		value: '',
		validation: {
			required: false,
		},
		// valid: false,
		touched: false,
	},
};

export default authFormFields;

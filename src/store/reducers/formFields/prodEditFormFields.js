const prodEditFormFields = {
	name: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Product name',
		},
		value: '',
		validation: {
			required: true,
		},
		label: 'Name',
		valid: false,
		touched: false,
	},
	price: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'price',
		},
		value: '',
		validation: {
			required: true,
			isNumeric: true,
			minLength: 1,
		},
		label: 'Price',
		valid: false,
		touched: false,
	},
	oldPrice: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Old price',
		},
		value: '',
		validation: {
			required: true,
			isNumeric: true,
			minLength: 1,
		},
		label: 'Old price',
		valid: false,
		touched: false,
	},
	shortDescription: {
		elementType: 'textarea',
		elementConfig: {
			type: 'text',
			placeholder: 'Short product description',
		},
		label: 'Short description',
		size: 'medium',
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	fullDescription: {
		elementType: 'textarea',
		elementConfig: {
			type: 'text',
			placeholder: 'Product description',
		},
		label: 'Description',
		size: 'big',
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
};

export default prodEditFormFields;

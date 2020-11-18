import React from 'react';
import { connect } from 'react-redux';
import classes from './SearchTools.module.scss';
import * as formActions from './../../../store/actions/formActions';
import Input from './../Input/Input';

const SearchTools = (props) => {
	const formElementsArray = [];

	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	return (
		<div className={classes.searchBarContainer}>
			{formElementsArray.map((formElement) => (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) =>
						props.updateFormField(
							event.target.value,
							formElement.id,
							'search'
						)
					}
				/>
			))}

			{/* <div className={classes.verticalEvenItem}>
				<form action=''>
					<select name='' id=''>
						<option value='A-Z'>A-Z</option>
						<option value='Z-A'>Z-A</option>
						<option value='priceUp'>cena: rosnąco</option>
						<option value='priceDes'>cena: malejąco</option>
					</select>
				</form>
			</div>
			<div className={`${classes.verticalEvenItem} ${classes.noBorder}`}>
				<label htmlFor=''>Tylko dostepne:</label>
				<input type='checkbox' />
			</div> */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formFields: state.formState.searchForm.fields,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateFormField: (enteredValue, selectedInputId, form) =>
			dispatch({
				type: formActions.UPDATE_FIELD,
				newValue: enteredValue,
				inputId: selectedInputId,
				form: form,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTools);

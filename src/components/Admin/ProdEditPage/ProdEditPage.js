import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './ProdEditPage.module.scss';
import * as formActions from '../../../store/actions/formActions';
// import isPresent from '../../../utilities/isPresent';

import Input from '../../UI/Input/Input';
import EditStatus from './../../UI/EditStatus/EditStatus';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const ProdEditPage = (props) => {
	const { prodData, updateFormField } = props;
	const saveSubmitHandler = (event) => {
		event.preventDefault();
		console.log(`[saveHandler]`);
	};

	const formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	useEffect(() => {
		if (prodData) {
			console.log(`[ProdEditPage]useEffect if statement`);
			const existingDataAboutProd = [
				{ name: prodData.name },
				{ price: prodData.price },
				{ oldPrice: prodData.oldPrice },
				{ shortDescription: prodData.shortDescription },
				{ fullDescription: prodData.fullDescription },
			];

			existingDataAboutProd.map((el) => {
				const keyName = Object.keys(el)[0];
				if (prodData[keyName]) {
					updateFormField(
						prodData[keyName].toString(),
						keyName,
						'prodEditForm',
						true
					);
				}
				return null;
			});
		}
	}, [prodData, updateFormField]);

	const inputChangedHandler = (event, inputId) => {
		updateFormField(event.target.value, inputId, 'prodEditForm');
	};

	// const isModified = isPresent(prodData.id, props.modifiedItems);
	// const isRemoved = isPresent(prodData.id, props.removedItems);
	const isModified = false;
	const isRemoved = false;

	let colorStyle;
	if (isRemoved) {
		colorStyle = 'utilOnRemove';
	} else if (prodData.processed) {
		colorStyle = 'utilOnSuccess';
	} else {
		colorStyle = null;
	}
	const appendClasses = [classes.head, colorStyle];

	return (
		<div className={classes.prodPageContainer}>
			<div className={appendClasses.join(' ')}>
				<h1>Product id: {prodData.id}</h1>
				{props.formIsEdited ? <p>EDITED!!!!</p> : null}
				<div className={classes.buttonContainer}>
					<EditStatus isEdited={isModified} />
					<GenericButton
						label='discard'
						// clicked={() => props.onModify(prodData, 'remove')}
					/>
					<GenericButton
						label='save'
						// clicked={() => props.onModify(prodData, 'remove')}
					/>
				</div>
			</div>
			<div className={classes.editContainer}>
				<div className={classes.dropContainer}>dropZOne</div>
				<div className={classes.descriptionContainer}>
					<h2>Product Id: {prodData.id}</h2>
					<form className='utilMarBot_1' onSubmit={saveSubmitHandler}>
						{formElementsArray.map((formElement) => (
							<Input
								key={formElement.id}
								label={formElement.config.label}
								elementType={formElement.config.elementType}
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								shouldValidate={formElement.config.validation}
								touched={formElement.config.touched}
								changed={(event) =>
									inputChangedHandler(event, formElement.id)
								}
								size={formElement.config.size}
							/>
						))}
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formFields: state.formState.prodEditForm.fields,
		formIsValid: state.formState.prodEditForm.formIsValid,
		formIsEdited: state.formState.prodEditForm.formIsEdited,
		formIsTouched: state.formState.prodEditForm.formIsTouched,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateFormField: (newValue, inputId, form, isInitial = false) =>
			dispatch({
				type: formActions.UPDATE_FIELD,
				newValue,
				inputId,
				form,
				isInitial,
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProdEditPage);

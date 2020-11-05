import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './ProdEditPage.module.scss';
import * as formActions from '../../../store/actions/formActions';
import isPresent from '../../../utilities/isPresent';

import Input from '../../UI/Input/Input';
import EditStatus from './../../UI/EditStatus/EditStatus';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const ProdEditPage = (props) => {
	const { prodData, updateFormField } = props;

	const saveSubmitHandler = (event) => {
		let newProduct = { id: prodData.id };

		Object.keys(props.formFields).map((el) => {
			if (props.formFields[el].isEdited) {
				newProduct = {
					...newProduct,
					[el]: props.formFields[el].value,
				};
			}
			return null;
		});
		props.onModify(newProduct, 'modify');
		props.onDiscard();
	};

	const inputChangedHandler = (event, inputId) => {
		updateFormField(event.target.value, inputId, 'prodEditForm');
	};

	const formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	const isRemoved = props.isNewProdCreation
		? null
		: isPresent(prodData.id, props.removedItems);

	const isModified = props.isNewProdCreation
		? null
		: isPresent(prodData.id, props.modifiedItems);

	useEffect(() => {
		if (prodData) {
			const dataToLoad = isModified
				? props.modifiedItems.find((el) => el.id === prodData.id)
				: prodData;

			const existingDataAboutProd = [
				{ name: dataToLoad.name },
				{ price: dataToLoad.price },
				{ oldPrice: dataToLoad.oldPrice },
				{ shortDescription: dataToLoad.shortDescription },
				{ fullDescription: dataToLoad.fullDescription },
			];

			existingDataAboutProd.map((el) => {
				const keyName = Object.keys(el)[0];
				if (dataToLoad[keyName]) {
					updateFormField(
						dataToLoad[keyName].toString(),
						keyName,
						'prodEditForm',
						true
					);
				}
				return null;
			});
		}
	}, [prodData, updateFormField, isModified, props.modifiedItems]);

	let colorStyle;
	if (isRemoved) {
		colorStyle = 'utilOnRemove';
	} else {
		colorStyle = null;
	}
	const appendClasses = [classes.head, colorStyle];

	return (
		<div className={classes.prodPageContainer}>
			<div className={appendClasses.join(' ')}>
				<h1>Product id: {prodData.id}</h1>
				<div className={classes.buttonContainer}>
					<EditStatus isEdited={props.formIsEdited || isModified} />
					<GenericButton
						label='reset'
						clicked={props.onDiscard}
						isDisabled={
							(!props.formIsEdited || isRemoved) && !isModified
						}
					/>
					<GenericButton
						label='save'
						clicked={saveSubmitHandler}
						isDisabled={
							!props.formIsEdited ||
							isRemoved ||
							!props.formIsValid
						}
					/>
					{props.isNewProdCreation ? null : (
						<GenericButton
							label='remove'
							clicked={() => props.onModify(prodData, 'remove')}
						/>
					)}
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

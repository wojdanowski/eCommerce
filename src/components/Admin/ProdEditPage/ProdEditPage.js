import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './ProdEditPage.module.scss';
import * as formActions from '../../../store/actions/formActions';
import isPresent from '../../../utilities/isPresent';
import { uploadImage } from '../../../utilities/imagesHandlers';
import Input from '../../UI/Input/Input';
import EditStatus from './../../UI/EditStatus/EditStatus';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';
import DropZone from './../DropZone/DropZone';
import ImgThumb from './../../UI/ImgThumb/ImgThumb';
import Loader from './../../UI/Loader/Loader';

const ProdEditPage = (props) => {
	const { prodData, updateFormField, clearForm } = props;
	const [loadedImages, setLoadedImages] = useState([]);
	const [imagesChanged, setImagesChanged] = useState(false);
	const [imagesUploading, setImagesUploading] = useState();
	const [uploadedImages, setUploadedImages] = useState([]);

	const isRemoved = props.isNewProdCreation
		? null
		: isPresent(prodData.id, props.removedItems);
	const isModified = props.isNewProdCreation
		? null
		: isPresent(prodData.id, props.modifiedItems);
	const isNewItem = props.isNewProdCreation
		? null
		: isPresent(prodData.id, props.newItems);

	const thumbClickedHandler = (src) => {
		const updatedArray = loadedImages.map((el) => {
			if (el.src === src) {
				return Object.assign(el, { removed: !el.removed });
			} else return el;
		});
		setLoadedImages([...updatedArray]);

		if (updatedArray.find((el) => el.removed) || isModified) {
			setImagesChanged(true);
		} else setImagesChanged(false);
	};

	const saveSubmitHandler = async (event) => {
		let newProduct = {
			id: prodData.id,
			images: [...loadedImages],
		};
		Object.keys(props.formFields).map((el) => {
			if (props.formFields[el].isEdited) {
				newProduct = {
					...newProduct,
					[el]: props.formFields[el].value,
				};
			}
			return null;
		});
		if (props.isNewProdCreation) {
			props.onModify(newProduct, 'createProduct');
		} else {
			// console.log(`[ProdEditPage] onModify(newProd,'modify')`);
			props.onModify(newProduct, 'modify');
		}
	};

	const inputChangedHandler = (event, inputId) => {
		updateFormField(event.target.value, inputId, 'prodEditForm');
	};

	const getFilesFromDropZone = async (images) => {
		setImagesUploading(true);
		let linksToUploadedImages;
		linksToUploadedImages = await uploadImage(images, prodData.id);
		// console.log(linksToUploadedImages);
		images.forEach((image) => URL.revokeObjectURL(image.preview));
		setLoadedImages((prevImages) =>
			prevImages.concat(
				linksToUploadedImages.map((el) => {
					return {
						src: el,
						removed: false,
					};
				})
			)
		);
		setImagesUploading(false);
		setImagesChanged(true);
	};

	let formElementsArray = [];
	for (let key in props.formFields) {
		formElementsArray.push({
			id: key,
			config: props.formFields[key],
		});
	}

	// Load initial images
	useEffect(() => {
		let allImgs = [];
		if (isModified) {
			allImgs = isModified.images;
		} else if (isNewItem) {
			allImgs = isNewItem.images;
		} else if (prodData.images) {
			allImgs = prodData.images.map((el) => {
				return {
					src: el,
					removed: false,
				};
			});
		}
		setLoadedImages([...allImgs]);
	}, [prodData.images, isModified]);

	useEffect(() => {
		let dataToLoad;
		let existingDataAboutProd;

		if (prodData && !props.isNewProdCreation) {
			dataToLoad = isModified
				? props.modifiedItems.find((el) => el.id === prodData.id)
				: prodData;

			existingDataAboutProd = [
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
		} else if (props.isNewProdCreation) clearForm();
	}, [
		prodData,
		updateFormField,
		isModified,
		props.modifiedItems,
		props.isNewProdCreation,
		clearForm,
	]);

	let thumbs = null;
	if (loadedImages && loadedImages.length) {
		thumbs = (
			<Fragment>
				{loadedImages.map((img, index) => {
					return (
						<ImgThumb
							key={img.src}
							imgSrc={img.src}
							clicked={() => thumbClickedHandler(img.src)}
							isRemoved={loadedImages[index].removed}
						/>
					);
				})}
			</Fragment>
		);
	} else {
		thumbs = <p>No Images!</p>;
	}

	let colorStyle;
	if (isRemoved) {
		colorStyle = 'utilOnRemove';
	} else {
		colorStyle = null;
	}
	const appendClasses = [classes.head, colorStyle];

	return imagesUploading ? (
		<Fragment>
			<p>Uploading images...</p>
			<Loader />
		</Fragment>
	) : (
		<div className={classes.prodPageContainer}>
			<div className={appendClasses.join(' ')}>
				<h1>Product id: {prodData.id}</h1>
				<div className={classes.buttonContainer}>
					<EditStatus
						isEdited={
							props.formIsEdited || isModified || imagesChanged
						}
					/>
					<GenericButton
						label='reset'
						clicked={props.onDiscard}
						isDisabled={
							(!props.formIsEdited || isRemoved) &&
							!isModified &&
							!imagesChanged
						}
					/>
					<GenericButton
						label='save'
						clicked={saveSubmitHandler}
						isDisabled={
							(!props.formIsValid ||
								isRemoved ||
								!props.formIsEdited) &&
							!imagesChanged
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
				<div className={classes.imgSection}>
					<div className={classes.dropContainer}>
						<h4>Upload images:</h4>
						<DropZone sendFilesToParent={getFilesFromDropZone} />
					</div>
					<div className={classes.thumbContainer}>
						<h4>Images:</h4>
						{thumbs}
					</div>
				</div>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateFormField: (
			newValue,
			inputId,
			form = 'prodEditForm',
			isInitial = false
		) =>
			dispatch({
				type: formActions.UPDATE_FIELD,
				newValue,
				inputId,
				form,
				isInitial,
			}),
		clearForm: (form = 'prodEditForm') =>
			dispatch({
				type: formActions.CLEAR_FORM,
				form,
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProdEditPage);

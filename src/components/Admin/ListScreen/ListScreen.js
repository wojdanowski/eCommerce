import React, { useState, Fragment, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './ListScreen.module.scss';
import { useFetchApi } from './../../../hooks/useFetchApi';
import * as uiActionTypes from '../../../store/actions/uiActions';
import isPresent from './../../../utilities/isPresent';

import FetchList from './FetchList/FetchList';
import Modal from './../../UI/Modal/Modal';
import ProductPage from './../../ProductPage/ProductPage';
import OrderDetailsPage from './../OrderDetailsPage/OrderDetailsPage';
import ProdEditPage from './../ProdEditPage/ProdEditPage';

const ListScreen = (props) => {
	const location = useLocation();
	const [selectedItem, setSelectedItem] = useState(null);
	const [isEditing, setIsEditing] = useState(null);
	const getCollectionName = () => {
		return location.pathname.replace('/admin/', '');
	};
	const [modifiedItems, setModifiedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const removeApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);
	const { toggleModal } = props;

	const clearIsEditingOnModalClose = () => {
		setIsEditing(false);
		toggleModal();
	};

	const isProductEdited = (newProduct, prodInDb) => {
		let isProdEdited = false;
		for (const key in newProduct) {
			if (key !== 'images') {
				isProdEdited =
					newProduct[key] !== prodInDb[key] ? true : isProdEdited;
			}
		}
		isProdEdited = newProduct.images ? true : isProdEdited;
		return isProdEdited;
	};

	const modifyItems = (data, action) => {
		const foundItem = isPresent(data.id, modifiedItems);
		if (!foundItem) {
			setModifiedItems((prevState) =>
				prevState.concat({
					...data,
					[action]: true,
					collection: getCollectionName(),
				})
			);
		} else if (foundItem) {
			switch (getCollectionName()) {
				case 'orders': {
					let updatedArray;
					if (
						(action === 'remove' && !foundItem.modify) ||
						(action === 'modify' && !foundItem.remove)
					) {
						updatedArray = modifiedItems.filter(
							(el) => el.id !== data.id
						);
					} else if (action === 'remove') {
						updatedArray = modifiedItems.map((el) => {
							if (foundItem.id === el.id) {
								return {
									...el,
									[action]: !el[action],
									collection: getCollectionName(),
								};
							} else return el;
						});
					}
					setModifiedItems(updatedArray);
					break;
				}
				case 'products': {
					let updatedArray;
					if (action === 'remove' && !foundItem.modify) {
						console.log(`removing is NOT modified`);
						updatedArray = modifiedItems.filter(
							(el) => el.id !== data.id
						);
					} else if (action === 'remove' && foundItem.modify) {
						console.log(`removing is modified`);
						updatedArray = modifiedItems.map((el) => {
							if (foundItem.id === el.id) {
								return {
									...el,
									[action]: !el[action],
									collection: getCollectionName(),
								};
							} else return el;
						});
					} else if (action === 'modify') {
						const isProdEdited = isProductEdited(
							data,
							selectedItem
						);
						if (isProdEdited) {
							updatedArray = modifiedItems.map((el) => {
								if (foundItem.id === el.id) {
									return {
										...el,
										...data,
										[action]: true,
										collection: getCollectionName(),
									};
								} else return el;
							});
						} else if (!isProdEdited) {
							if (!foundItem.remove) {
								updatedArray = modifiedItems.filter(
									(el) => el.id !== data.id
								);
							} else {
								updatedArray = modifiedItems.map((el) => {
									if (foundItem.id === el.id) {
										return {
											...el,
											...data,
											[action]: false,
											collection: getCollectionName(),
										};
									} else return el;
								});
							}
						}

						// console.log(`data:`);
						// console.log(data);
						// console.log(`selected item:`);
						// console.log(selectedItem);

						// console.log(
						// 	`isProduct edited: ${isProductEdited(
						// 		data,
						// 		selectedItem
						// 	)}`
						// );
					}
					setModifiedItems(updatedArray);
					break;
				}
				default:
					return;
			}
		}
	};

	const modifyHandler = (data, action) => {
		switch (getCollectionName()) {
			case 'orders': {
				modifyItems(data, action);
				break;
			}
			case 'products': {
				if (action === 'remove') {
					modifyItems(data, action);
				} else if (action === 'modify') {
					setSelectedItem(data);
					setIsEditing(true);
					toggleModal();
				}
				break;
			}
			default: {
				console.log(`[ListScreen] modifyHandler default case`);
			}
		}
	};

	const viewHandler = useCallback(
		(item) => {
			setSelectedItem(item);
			toggleModal();
		},
		[toggleModal]
	);

	const resetHandler = () => {
		if (modifiedItems.length) {
			setModifiedItems([]);
		}
	};

	const saveHandler = async () => {
		if (modifiedItems.length) {
			try {
				await Promise.all(
					modifiedItems.map((el) => {
						let updatedItem;
						let action = 'patch';
						if (el.remove) action = 'delete';

						if (el.collection === 'orders' && el.modify) {
							updatedItem = {
								processed: !el.processed,
							};
						} else if (el.collection === 'products' && el.modify) {
							updatedItem = Object.keys(el).reduce(
								(object, key) => {
									if (
										key !== 'collection' &&
										key !== 'remove' &&
										key !== 'modify'
									) {
										object[key] = el[key];
									}
									return object;
								},
								{}
							);
						}

						return removeApi.callFetchApi(
							{ ...updatedItem },
							action,
							url.concat(getCollectionName(), `/${el.id}.json`)
						);
					})
				);
			} catch (err) {
				console.log(err);
			}
			resetHandler();
		}
	};

	const deletedItems = modifiedItems.filter((el) => el.remove === true);
	const editedItems = modifiedItems.filter((el) => el.modify === true);
	let modalContent;

	switch (getCollectionName()) {
		case 'orders': {
			modalContent =
				selectedItem && props.modalVisible ? (
					<OrderDetailsPage
						orderData={selectedItem}
						onModify={modifyHandler}
						removedItems={deletedItems}
						modifiedItems={editedItems}
					/>
				) : null;
			break;
		}
		case 'products': {
			if (isEditing) {
				modalContent =
					selectedItem && props.modalVisible ? (
						<ProdEditPage
							prodData={selectedItem}
							removedItems={deletedItems}
							modifiedItems={editedItems}
							onModify={modifyItems}
							isNewProdCreation={false}
							onDiscard={clearIsEditingOnModalClose}
						/>
					) : null;
			} else {
				modalContent =
					selectedItem && props.modalVisible ? (
						<ProductPage
							isAdmin={true}
							prodData={selectedItem}
							isPurchasable={false}
						/>
					) : null;
			}
			break;
		}
		default: {
			modalContent = <p>NO SUCH ITEM</p>;
		}
	}

	return (
		<Fragment>
			<div className={classes.prodScreenContainer}>
				<FetchList
					isModified={modifiedItems.length}
					collection={getCollectionName()}
					onView={viewHandler}
					onModify={modifyHandler}
					onSave={saveHandler}
					onReset={resetHandler}
					removedItems={deletedItems}
					modifiedItems={editedItems}
				/>
			</div>
			<Modal
				show={props.modalVisible}
				modalClosed={clearIsEditingOnModalClose}
			>
				{modalContent}
			</Modal>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		modalVisible: state.uiState.modalVisible,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleModal: () => dispatch({ type: uiActionTypes.TOGGLE_MODAL }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);

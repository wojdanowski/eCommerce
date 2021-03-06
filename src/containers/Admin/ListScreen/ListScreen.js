import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './ListScreen.module.scss';
import { useFetchApi } from '../../../hooks/useFetchApi';
import * as uiActionTypes from '../../../store/actions/uiActions';
import isPresent from '../../../utilities/isPresent';

import FetchList from '../../../components/Admin/ListScreen/FetchList/FetchList';
import Modal from '../../../components/UI/Modal/Modal';
import ProductPage from '../../../components/ProductPage/ProductPage';
import OrderDetailsPage from '../../../components/Admin/OrderDetailsPage/OrderDetailsPage';
import ProdEditPage from '../../../components/Admin/ProdEditPage/ProdEditPage';
import Loader from './../../../components/UI/Loader/Loader';

const ListScreen = (props) => {
	const location = useLocation();
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedAction, setSelectedAction] = useState(null);
	const [newProductId, setNewProductId] = useState(null);
	const [newProductFinished, setNewProductFinished] = useState(null);
	const auth = props.token ? `?auth=${props.token}` : '';

	const getCollectionName = useCallback(() => {
		return location.pathname.replace('/admin/', '');
	}, [location.pathname]);

	const [modifiedItems, setModifiedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const fetchApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);

	const { toggleModal } = props;

	const clearSelectionInfo = useCallback(() => {
		// toggleModal();
		setTimeout(() => {
			setSelectedAction(null);
			setNewProductId(null);
		}, 300);
	}, []);

	useEffect(() => {
		if (
			selectedAction === 'createProduct' &&
			newProductId &&
			!newProductFinished &&
			props.modalDisappeared &&
			getCollectionName() === 'products'
		) {
			fetchApi.callFetchApi(
				null,
				'delete',
				`${url}products/${newProductId}.json${auth}`
			);
		}
	}, [
		selectedAction,
		newProductId,
		newProductFinished,
		props.modalDisappeared,
		url,
		fetchApi,
		getCollectionName,
		auth,
	]);

	const discardHandler = (id) => {
		const updatedArray = modifiedItems.filter((el) => el.id !== id);
		setModifiedItems(updatedArray);
		// clearSelectionInfo();
	};

	const isProductEdited = (newProduct, prodInDb) => {
		// console.log(`comparing products`);
		let isProdEdited = false;
		for (const key in newProduct) {
			if (key !== 'images') {
				if (newProduct[key] !== prodInDb[key]) {
					// console.log(`form edited`);
					return (isProdEdited = true);
				}
			} else {
				if (!prodInDb.images && newProduct.images) {
					return (isProdEdited = true);
				} else if (prodInDb.images && newProduct.images) {
					if (newProduct.images.find((el) => el.removed)) {
						return (isProdEdited = true);
					}
					for (const index in newProduct.images) {
						if (
							!prodInDb.images.find(
								(dbImg) =>
									dbImg === newProduct.images[index].src
							)
						) {
							return (isProdEdited = true);
						}
					}
				}
			}
		}
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
			if (action === 'createProduct') setNewProductFinished(true);
			if (props.modalVisible && getCollectionName() === 'products')
				toggleModal();
		} else if (foundItem) {
			switch (getCollectionName()) {
				case 'orders': {
					let updatedArray;
					updatedArray = modifiedItems.map((el) => {
						if (foundItem.id === el.id) {
							return {
								...el,
								[action]: !el[action],
								collection: getCollectionName(),
							};
						} else return el;
					});
					setModifiedItems(updatedArray);
					break;
				}
				case 'products': {
					let updatedArray;
					if (action === 'remove') {
						updatedArray = modifiedItems.map((el) => {
							if (foundItem.id === el.id) {
								return {
									...el,
									[action]: !el[action],
									collection: getCollectionName(),
								};
							} else return el;
						});
						if (props.modalVisible) clearSelectionInfo();
					} else if (action === 'modify') {
						const isProdEdited = isProductEdited(
							data,
							selectedItem
						);
						updatedArray = modifiedItems.map((el) => {
							if (foundItem.id === el.id) {
								return {
									...el,
									...data,
									[action]: isProdEdited,
									collection: getCollectionName(),
								};
							} else return el;
						});
						if (props.modalVisible) clearSelectionInfo();
					} else if (action === 'createProduct') {
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
					}
					if (props.modalVisible) toggleModal();
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
					setSelectedAction('editing');
					toggleModal();
				}
				break;
			}
			default: {
				// console.log(`[ListScreen] modifyHandler default case`);
			}
		}
	};

	const viewHandler = useCallback(
		(item) => {
			setSelectedItem(item);
			setSelectedAction('view');
			toggleModal();
		},
		[toggleModal]
	);

	const resetHandler = () => {
		if (modifiedItems.length) {
			setModifiedItems([]);
		}
	};

	const newProductClickedHandler = async () => {
		setSelectedAction('createProduct');
		setNewProductFinished(false);
		toggleModal();
		const newProductId = await fetchApi.callFetchApi(
			{ name: '' },
			'post',
			`${url}products.json${auth}`
		);
		setNewProductId(newProductId.data.name);
	};

	const saveHandler = async () => {
		if (modifiedItems.length) {
			try {
				await Promise.all(
					modifiedItems
						.filter(
							(el) =>
								el.remove === true ||
								el.modify === true ||
								el.createProduct === true
						)
						.map((el) => {
							let updatedItem;
							let action = 'patch';
							if (el.remove) action = 'delete';
							if (el.collection === 'orders' && el.modify) {
								updatedItem = {
									processed: !el.processed,
								};
							} else if (
								el.collection === 'products' &&
								(el.modify || el.createProduct)
							) {
								updatedItem = Object.keys(el).reduce(
									(object, key) => {
										if (
											key !== 'collection' &&
											key !== 'remove' &&
											key !== 'modify' &&
											key !== 'createProduct'
										) {
											object[key] = el[key];
										}
										return object;
									},
									{}
								);
								if (updatedItem.images) {
									let updatedImages = updatedItem.images
										.filter((image) => !image.removed)
										.map((image) => image.src);
									updatedItem.images = updatedImages;
								}
							}

							return fetchApi.callFetchApi(
								{ ...updatedItem },
								action,
								url.concat(
									getCollectionName(),
									`/${el.id}.json${auth}`
								)
							);
						})
				);
			} catch (err) {
				// console.log(err);
			}
			resetHandler();
		}
	};

	const deletedItems = modifiedItems.filter((el) => el.remove === true);
	const editedItems = modifiedItems.filter((el) => el.modify === true);
	const newItems = modifiedItems.filter((el) => el.createProduct === true);

	// Modal content
	let modalContent;
	switch (getCollectionName()) {
		case 'orders': {
			modalContent =
				selectedItem && !props.modalDisappeared ? (
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
			switch (selectedAction) {
				case 'editing': {
					modalContent =
						selectedItem && !props.modalDisappeared ? (
							<ProdEditPage
								newItems={newItems}
								prodData={selectedItem}
								removedItems={deletedItems}
								modifiedItems={editedItems}
								onModify={modifyItems}
								isNewProdCreation={false}
								onDiscard={() =>
									discardHandler(selectedItem.id)
								}
							/>
						) : null;
					break;
				}
				case 'createProduct': {
					if (fetchApi.isLoading) {
						modalContent = <Loader />;
					} else if (
						fetchApi.data &&
						newProductId &&
						!props.modalDisappeared
					) {
						const prodData = { id: newProductId };
						modalContent = (
							<ProdEditPage
								newItems={newItems}
								prodData={prodData}
								removedItems={deletedItems}
								modifiedItems={editedItems}
								onModify={modifyItems}
								isNewProdCreation={true}
								onDiscard={() => discardHandler(newProductId)}
							/>
						);
					} else if (fetchApi.isError) {
						modalContent = <p>ERROR</p>;
					} else modalContent = <p>Something went wrong</p>;
					break;
				}
				case 'view': {
					modalContent =
						selectedItem && !props.modalDisappeared ? (
							<ProductPage
								isAdmin={true}
								prodData={selectedItem}
								isPurchasable={false}
							/>
						) : null;
					break;
				}
				default: {
					modalContent = <p>404</p>;
				}
			}
			break;
		}
		default: {
			modalContent = <p>404</p>;
		}
	}
	const isFetchListModified = modifiedItems.find(
		(el) => el.remove || el.modify || el.createProduct
	);
	return (
		<Fragment>
			<div className={classes.prodScreenContainer}>
				<FetchList
					isModified={isFetchListModified}
					collection={getCollectionName()}
					onView={viewHandler}
					onModify={modifyHandler}
					onSave={saveHandler}
					onReset={resetHandler}
					removedItems={deletedItems}
					modifiedItems={editedItems}
					newItems={newItems}
					onNewProduct={newProductClickedHandler}
				/>
			</div>
			<Modal
				show={props.modalVisible}
				modalClosed={() => {
					toggleModal();
					clearSelectionInfo();
				}}
			>
				{modalContent}
			</Modal>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		modalVisible: state.uiState.modalVisible,
		modalDisappeared: state.uiState.modalDisappeared,
		token: state.authState.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleModal: () => {
			dispatch({ type: uiActionTypes.TOGGLE_MODAL });
			setTimeout(() => {
				dispatch({ type: uiActionTypes.SET_MODAL_DISAPPEARED });
			}, 300);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);

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

	const getCollectionName = useCallback(() => {
		return location.pathname.replace('/admin/', '');
	}, [location.pathname]);

	const [modifiedItems, setModifiedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const fetchApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);

	const { toggleModal } = props;

	const clearIsEditingOnModalClose = useCallback(() => {
		toggleModal();
		setTimeout(() => {
			setSelectedAction(null);
			setNewProductId(null);
		}, 300);
	}, [toggleModal]);

	useEffect(() => {
		if (
			selectedAction === 'createProduct' &&
			newProductId &&
			!newProductFinished &&
			props.modalDisappeared &&
			getCollectionName() === 'products'
		) {
			console.log(`[ListScreen] useEffect: newProd to delete`);
			fetchApi.callFetchApi(
				null,
				'delete',
				`${url}products/${newProductId}.json`
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
	]);

	const discardHandler = () => {
		const updatedArray = modifiedItems.filter(
			(el) => el.id !== selectedItem.id
		);
		setModifiedItems(updatedArray);
		clearIsEditingOnModalClose();
	};

	const discardNewProdHandler = () => {
		fetchApi();
		discardHandler();
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
			if (props.modalVisible) clearIsEditingOnModalClose();
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
						if (props.modalVisible) clearIsEditingOnModalClose();
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
						if (props.modalVisible) clearIsEditingOnModalClose();
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
				console.log(`[ListScreen] modifyHandler default case`);
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
		toggleModal();
		const newProductId = await fetchApi.callFetchApi(
			{ name: '' },
			'post',
			`${url}products.json`
		);
		setNewProductId(newProductId.data.name);
	};

	const saveHandler = async () => {
		if (modifiedItems.length) {
			try {
				await Promise.all(
					modifiedItems
						.filter(
							(el) => el.remove === true || el.modify === true
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
								el.modify
							) {
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

							return fetchApi.callFetchApi(
								{ ...updatedItem },
								action,
								url.concat(
									getCollectionName(),
									`/${el.id}.json`
								)
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
								prodData={selectedItem}
								removedItems={deletedItems}
								modifiedItems={editedItems}
								onModify={modifyItems}
								isNewProdCreation={false}
								onDiscard={discardHandler}
							/>
						) : null;
					break;
				}
				case 'createProduct': {
					if (fetchApi.isLoading || !fetchApi.data) {
						modalContent = <Loader />;
					} else if (
						fetchApi.data &&
						newProductId &&
						!props.modalDisappeared
					) {
						const prodData = { id: newProductId };
						modalContent = (
							<ProdEditPage
								prodData={prodData}
								removedItems={deletedItems}
								modifiedItems={editedItems}
								onModify={modifyItems}
								isNewProdCreation={true}
								onDiscard={discardNewProdHandler}
							/>
						);
					} else if (fetchApi.isError) {
						modalContent = <p>error</p>;
					}
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
		(el) => el.remove || el.modify
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
					onNewProduct={newProductClickedHandler}
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
		modalDisappeared: state.uiState.modalDisappeared,
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

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

const ListScreen = (props) => {
	const location = useLocation();
	const [selectedItem, setSelectedItem] = useState(null);
	const getCollectionName = () => {
		return location.pathname.replace('/admin/', '');
	};
	const [modifiedItems, setModifiedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const removeApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);
	const { toggleModal } = props;

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
			if (
				(action === 'remove' && !foundItem.modify) ||
				(action === 'modify' && !foundItem.remove)
			) {
				const updatedArray = modifiedItems.filter(
					(el) => el.id !== data.id
				);
				setModifiedItems(updatedArray);
			} else if (action === 'remove') {
				const newArray = modifiedItems.map((el) => {
					if (foundItem.id === el.id) {
						return {
							...el,
							[action]: !el[action],
							collection: getCollectionName(),
						};
					} else return el;
				});
				setModifiedItems(newArray);
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
					// TODO	load modal for editing product
					modifyItems(data, action);
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
				const response = await Promise.all(
					modifiedItems.map((el) => {
						let updatedItem;
						let action = 'patch';
						if (el.remove) action = 'delete';

						if (el.collection === 'orders' && el.modify) {
							updatedItem = {
								processed: !el.processed,
							};
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

	let modalContent;
	const deletedItems = modifiedItems.filter((el) => el.remove === true);
	const editedItems = modifiedItems.filter((el) => el.modify === true);

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
			modalContent =
				selectedItem && props.modalVisible ? (
					<ProductPage
						prodData={selectedItem}
						isPurchasable={false}
					/>
				) : null;
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
			<Modal show={props.modalVisible} modalClosed={props.toggleModal}>
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

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './ListScreen.module.scss';
import { useFetchApi } from './../../../hooks/useFetchApi';
import * as uiActionTypes from '../../../store/actions/uiActions';

import isPresent from './../../../utilities/isPresent';
import FetchList from './FetchList/FetchList';

const ListScreen = ({ match }) => {
	const location = useLocation();

	const getCollectionName = () => {
		return location.pathname.replace('/admin/', '');
	};

	const [modifiedItems, setModifiedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const removeApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);

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

	const viewHandler = () => {
		console.log(`[ListScreen] view`);
	};

	const confirmOrderHandler = () => {
		console.log(`[ListScreen] confirmOrder`);
	};

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
						return removeApi.callFetchApi(
							null,
							el.action,
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

	return (
		<div className={classes.prodScreenContainer}>
			<FetchList
				isModified={modifiedItems.length}
				collection={getCollectionName()}
				onView={viewHandler}
				onModify={modifyHandler}
				onSave={saveHandler}
				onReset={resetHandler}
				modifiedItems={modifiedItems.filter((el) => el.modify === true)}
				removedItems={modifiedItems.filter((el) => el.remove === true)}
			/>
		</div>
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

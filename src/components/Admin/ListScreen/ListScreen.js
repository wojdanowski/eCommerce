import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import classes from './ListScreen.module.scss';
import { useFetchApi } from './../../../hooks/useFetchApi';

import isPresent from './../../../utilities/isPresent';
import FetchList from './FetchList/FetchList';

const ListScreen = ({ match }) => {
	const location = useLocation();

	const getCollectionName = () => {
		return location.pathname.replace('/admin/', '');
	};

	const [deletedItems, setDeletedItems] = useState([]);
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const removeApi = useFetchApi('delete', [
		url.concat(getCollectionName(), '.json'),
	]);

	const removeHandler = (data) => {
		const isElementPresent = isPresent(data.id, deletedItems);
		if (!isElementPresent) {
			setDeletedItems((prevState) =>
				prevState.concat({
					...data,
					action: 'delete',
					collection: getCollectionName(),
				})
			);
		} else if (isElementPresent) {
			const updatedArray = deletedItems.filter((el) => el.id !== data.id);
			setDeletedItems(updatedArray);
		}
	};

	const modifyHandler = (data, collection) => {
		console.log(`[ListScreen] edit`);
		console.log(data, collection);
	};

	const viewHandler = () => {
		console.log(`[ListScreen] view`);
	};

	const confirmOrderHandler = () => {
		console.log(`[ListScreen] confirmOrder`);
	};

	const resetHandler = () => {
		if (deletedItems.length) {
			setDeletedItems([]);
		}
	};

	const saveHandler = async () => {
		if (deletedItems.length) {
			try {
				await Promise.all(
					deletedItems.map((el) => {
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
				isModified={!deletedItems.length}
				collection={getCollectionName()}
				onView={viewHandler}
				onModify={modifyHandler}
				onRemove={removeHandler}
				onSave={saveHandler}
				onReset={resetHandler}
				modifiedItems={deletedItems.filter(
					(el) => el.action === 'post'
				)}
				removedItems={deletedItems.filter(
					(el) => el.action === 'delete'
				)}
			/>
		</div>
	);
};

export default ListScreen;

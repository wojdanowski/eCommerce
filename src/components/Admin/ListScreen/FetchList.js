import React, { Fragment, useEffect, useState } from 'react';

import classes from './Screens/OrderScreen/OrderScreen.module.scss';
import usePagination from './../../../hooks/usePagination';
import { useFetchApi } from './../../../hooks/useFetchApi';
import Loader from './../../UI/Loader/Loader';
import addIdsToData from './../../../utilities/addIdsToData';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';
import PaginationButtons from './../../UI/PaginationButtons/PaginationButtons';

const FetchList = (props) => {
	const maxPerPage = 10;
	const [fetchedCollection, setFetchedCollection] = useState(
		props.collection
	);
	const orderBy = `.json?orderBy="$key"`;
	const url = `https://ecommerceprodmockup.firebaseio.com/`;
	const fullUrl = `${url}${props.collection}${orderBy}`;
	let fetchData = usePagination(fullUrl, maxPerPage, useFetchApi, 'get');

	const [update, setUpdate] = useState(true);

	const dataWithIds = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

	useEffect(() => {
		if (update || props.collection !== fetchedCollection) {
			setFetchedCollection(props.collection);
			fetchData.callFetchApi(null, null, fullUrl);
			setUpdate(false);
		}
	}, [fetchData, update, props.collection, fetchedCollection, fullUrl]);

	const saveChangesHandler = async () => {
		await props.onSave();
		fetchData.callFetchApi();
	};
	let listContent = null;

	if (
		dataWithIds.isLoading ||
		update ||
		props.collection !== fetchedCollection
	) {
		listContent = <Loader />;
	} else if (dataWithIds.isError) {
		listContent = <p>ERROR</p>;
	} else {
		const dataArray = Object.values(dataWithIds.data);
		const childrenWithProps = React.Children.map(
			props.children,
			(child) => {
				// checking isValidElement is the safe way and avoids a typescript error too
				const props = { dataArray };
				if (React.isValidElement(child)) {
					return React.cloneElement(child, props);
				}
				return child;
			}
		);

		listContent = (
			<Fragment>
				<div className={classes.actionButtonsContainer}>
					<h1>ACTIVE Orders</h1>
					<GenericButton
						label={'save'}
						type={'green'}
						clicked={saveChangesHandler}
						isDisabled={props.deletedItems.length ? false : true}
					/>
				</div>
				{childrenWithProps}
				<PaginationButtons
					resetChanges={props.onReset}
					fetchApi={dataWithIds}
				/>
			</Fragment>
		);
	}

	return <Fragment>{listContent}</Fragment>;
};

export default FetchList;

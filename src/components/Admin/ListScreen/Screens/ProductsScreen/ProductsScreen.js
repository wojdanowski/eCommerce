import React, { Fragment, useState, useEffect } from 'react';

import addIdsToData from './../../../../../utilities/addIdsToData';
import ProdListItem from './../../ProdListItem/ProdListItem';
import Loader from './../../../../UI/Loader/Loader';
import GenericList from './../../../../UI/GenericList/GenericList';
import usePagination from './../../../../../hooks/usePagination';
import PaginationButtons from './../../../../UI/PaginationButtons/PaginationButtons';
import { useFetchApi } from './../../../../../hooks/useFetchApi';

const ProductsScreen = (props) => {
	const maxPerPage = 10;
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	const [isUpdated, setIsUpdated] = useState(false);

	let fetchData = usePagination(url, maxPerPage, useFetchApi, 'get');

	const productsData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};
	useEffect(() => {
		if (!isUpdated) {
			fetchData.callFetchApi();
			setIsUpdated(true);
		}
	}, [isUpdated, fetchData]);
	let listContent = null;

	if (productsData.isLoading) {
		listContent = <Loader />;
	} else if (productsData.isError) {
		listContent = <p>ERROR</p>;
	} else {
		listContent = (
			<GenericList
				dataArray={Object.values(productsData.data)}
				displayWith={ProdListItem}
				additional={{
					removeHandler: props.onRemove,
					editHandler: props.onEdit,
					viewHandler: props.onView,
					removedItems: props.removedItems,
				}}
			/>
		);
	}

	return (
		<Fragment>
			{listContent}
			<PaginationButtons
				fetchApi={productsData}
				resetChanges={props.onReset}
			/>
		</Fragment>
	);
};

export default ProductsScreen;

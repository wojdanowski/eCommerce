import React, { Fragment } from 'react';

import usePagination from './../../../../hooks/usePagination';
import GenericList from './../../../UI/GenericList/GenericList';
import addIdsToData from './../../../../utilities/addIdsToData';
import Loader from './../../../UI/Loader/Loader';
import PaginationButtons from './../../../UI/PaginationButtons/PaginationButtons';
import ProdListItem from './../ProdListItem/ProdListItem';

const ProductsScreen = (props) => {
	const maxPerPage = 10;
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	let fetchData = usePagination(url, maxPerPage);

	const productsData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

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

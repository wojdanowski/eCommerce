import React, { Fragment, useState, useEffect } from 'react';
import PaginationButtons from './../../UI/PaginationButtons/PaginationButtons';
import usePagination from './../../../hooks/usePagination';
import Loader from './../../UI/Loader/Loader';
import addIdsToData from './../../../utilities/addIdsToData';

const FetchList = (props) => {
	const maxPerPage = 15;
	const url = `https://ecommerceprodmockup.firebaseio.com/${props.collection}.json?orderBy="$key"`;
	const ListContent = props.listComponent;
	const [isLoading, setIsLoading] = useState(false);
	let fetchApi = usePagination(url, maxPerPage);
	let listContent = null;

	const fetchData = {
		...fetchApi,
		data: {
			...addIdsToData(fetchApi.data),
		},
	};
	console.log(fetchApi.isLoading);
	// useEffect(() => {
	// 	setIsLoading(true);
	// 	console.log(`collection: ${props.collection}`);
	// 	fetchData.setUrl(
	// 		`https://ecommerceprodmockup.firebaseio.com/${props.collection}.json?orderBy="$key"`
	// 	);
	// 	console.log(`UseEffect`);
	// 	if (!fetchData || fetchData.isLoading) {
	// 		setIsLoading(true);
	// 	} else {
	// 		setIsLoading(false);
	// 		console.log(`setting is loading to false: ${isLoading}`);
	// 	}
	// }, [props.collection, fetchData, isLoading]);

	if (fetchData.isLoading) {
		listContent = <Loader />;
	}
	if (!fetchData.isLoading && fetchData) {
		console.log(fetchData.data);
		listContent = (
			<Fragment>
				<ListContent
					dataArray={Object.values(fetchData.data)}
					displayWith={props.listItem}
					additional={{
						removeHandler: props.onRemove,
						editHandler: props.onEdit,
					}}
				/>
				<PaginationButtons fetchApi={fetchData} />
			</Fragment>
		);
	}

	// if (isLoading) {
	// 	listContent = <Loader />;
	// } else if (fetchData.isError) {
	// 	listContent = <p>ERROR</p>;
	// } else {
	// 	listContent = (
	// 		<Fragment>
	// 			<ListContent
	// 				dataArray={Object.values(fetchData.data)}
	// 				displayWith={props.listItem}
	// 				additional={{
	// 					removeHandler: props.onRemove,
	// 					editHandler: props.onEdit,
	// 				}}
	// 			/>
	// 			<PaginationButtons fetchApi={fetchData} />
	// 		</Fragment>
	// 	);
	// }

	return listContent;
};

export default FetchList;

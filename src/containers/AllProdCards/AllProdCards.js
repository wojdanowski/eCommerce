import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import useDataApi from '../../hooks/useFetchData';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './AllProdCards.module.scss';
import ProdCard from '../../components/ProductCard/ProdCard';
import GenericButton from '../../components/UI/Buttons/GenericButton/GenericButton';
import Loader from '../../components/UI/Loader/Loader';
import Modal from '../../components/UI/Modal/Modal';
import ProductPage from '../../components/ProductPage/ProductPage';

const AllProdCards = (props) => {
	const maxProdsOnPage = 13;
	const [pagination, setPagination] = useState(
		`&limitToFirst=${maxProdsOnPage}`
	);
	const [selectedProd, setSelectedProd] = useState(null);

	const query =
		'https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"';
	let fetchedData = useDataApi(query.concat(pagination));

	let dataWithIds = fetchedData.data;
	for (const property in fetchedData.data) {
		dataWithIds[property] = {
			...fetchedData.data[property],
			id: property,
		};
	}
	let prodData = {
		...fetchedData,
		data: {
			...dataWithIds,
		},
	};

	const getLastItem = (obj) => {
		return Object.keys(obj)[Object.keys(obj).length - 1];
	};
	const getFirstItem = (obj) => {
		return Object.keys(obj)[0];
	};

	const paginateHandler = (forward = true) => {
		let paginationProperties;
		if (forward) {
			paginationProperties = `&limitToFirst=${maxProdsOnPage}&startAt="${getLastItem(
				prodData.data
			)}"`;
		} else {
			paginationProperties = `&limitToLast=${maxProdsOnPage}&endAt="${getFirstItem(
				prodData.data
			)}"`;
		}

		setPagination(paginationProperties);
	};

	useEffect(() => {
		prodData.setUrl(query.concat(pagination));
	}, [prodData, pagination]);

	const productClickedHandler = (id) => {
		setSelectedProd(id);
		props.toggleModal();
	};

	let filteredProdList;
	if (!prodData.isLoading && prodData.data) {
		const prodList = Object.values(prodData.data);
		filteredProdList = prodList.map((product, index) => {
			if (index !== prodList.length - 1) {
				return (
					<ProdCard
						key={product.id}
						productInfo={product}
						clicked={productClickedHandler}
					/>
				);
			} else return null;
		});
	}

	let modalProdContent = null;

	if (selectedProd && props.modalVisible) {
		modalProdContent = (
			<ProductPage prodData={prodData.data[selectedProd]} />
		);
	} else modalProdContent = <p>No product...</p>;

	return (
		<Fragment>
			<div className='utilBigContainer'>
				{prodData.isError && <div>Something went wrong ...</div>}
				{prodData.isLoading ? (
					<Loader />
				) : (
					<Fragment>
						<div className={classes.productsGrid}>
							{filteredProdList}
						</div>
						<div className={classes.paginationNav}>
							<GenericButton
								label={'< Previous Page'}
								clicked={() => paginateHandler(false)}
							/>
							<GenericButton
								label={'Next Page >'}
								clicked={() => paginateHandler()}
							/>
						</div>
					</Fragment>
				)}
			</div>
			<Modal show={props.modalVisible} modalClosed={props.toggleModal}>
				{modalProdContent}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProdCards);

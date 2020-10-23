import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { useContinuousFetchApi } from './../../hooks/useContinuousFetchApi';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './AllProdCards.module.scss';
import addIdsToData from './../../utilities/addIdsToData';

import ProdCard from '../../components/ProductCard/ProdCard';
import GenericButton from '../../components/UI/Buttons/GenericButton/GenericButton';
import Loader from '../../components/UI/Loader/Loader';
import Modal from '../../components/UI/Modal/Modal';
import ProductPage from '../../components/ProductPage/ProductPage';

const AllProdCards = (props) => {
	const maxProdsOnPage = 13;
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	const [pagination, setPagination] = useState(
		`&limitToFirst=${maxProdsOnPage}`
	);
	const [selectedProd, setSelectedProd] = useState(null);

	// let fetchData = useFetchApi('get', [`${url}${pagination}`]);
	let fetchData = useContinuousFetchApi(url.concat(pagination));

	// useEffect(() => {
	// 	fetchData.callFetchApi();
	// }, [pagination]);

	const prodData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
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
		prodData.setUrl(url.concat(pagination));
	}, [prodData, pagination, url]);

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

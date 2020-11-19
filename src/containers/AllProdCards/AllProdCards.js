import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import usePagination from './../../hooks/usePagination';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './AllProdCards.module.scss';

import ProdCard from '../../components/ProductCard/ProdCard';
import GenericButton from '../../components/UI/Buttons/GenericButton/GenericButton';
import Loader from '../../components/UI/Loader/Loader';
import Modal from '../../components/UI/Modal/Modal';
import ProductPage from '../../components/ProductPage/ProductPage';
import { useFetchApi } from './../../hooks/useFetchApi';

const AllProdCards = (props) => {
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	const [selectedProd, setSelectedProd] = useState(null);
	const { toggleModal } = props;
	const maxPerPage = 16;
	const [isUpdated, setIsUpdated] = useState(false);
	const [shouldSearch, setShouldSearch] = useState(false);

	const fetchApi = useFetchApi('get', [null]);
	const rawData = usePagination(url, maxPerPage, useFetchApi, 'get');
	let fetchData = rawData;
	const callPaginatedApi = fetchData.callFetchApi;
	const { callFetchApi } = fetchApi;

	if (rawData.data && !rawData.isLoading) {
		fetchData.data = rawData.data.map((product) => {
			return {
				...product,
				price: parseFloat(product.price),
				oldPrice: parseFloat(product.oldPrice),
			};
		});
	}

	useEffect(() => {
		if (props.enteredSearchQuery.length < 3) setShouldSearch(false);
		if (!isUpdated && !shouldSearch) {
			callPaginatedApi();
			setIsUpdated(true);
		}
	}, [
		isUpdated,
		callPaginatedApi,
		shouldSearch,
		props.enteredSearchQuery.length,
	]);

	useEffect(() => {
		if (props.enteredSearchQuery.length < 3) setShouldSearch(false);
		if (props.enteredSearchQuery.length >= 3) {
			setShouldSearch(true);
			const searchUrl = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="name"&startAt="${props.enteredSearchQuery}"&endAt="${props.enteredSearchQuery} z"`;
			callFetchApi(null, 'get', searchUrl);
		}
	}, [props.enteredSearchQuery, callFetchApi]);

	const productClickedHandler = useCallback(
		(id) => {
			setSelectedProd(id);
			toggleModal();
		},
		[toggleModal]
	);

	let modalProdContent = null;
	if (fetchData.isLoading) modalProdContent = <Loader />;
	if (selectedProd && !props.modalDisappeared && fetchData.data) {
		let selectedProdData = fetchData.data.filter(
			(el) => el.id === selectedProd
		)[0];

		modalProdContent = (
			<ProductPage isPurchasable={true} prodData={selectedProdData} />
		);
	} else modalProdContent = <p>No product...</p>;

	let productsToDisplay;
	let dataSet = shouldSearch ? fetchApi : fetchData;

	if (dataSet.data) {
		let filteredProdList;
		if (!dataSet.isLoading && dataSet.data) {
			filteredProdList = dataSet.data.map((product) => {
				return (
					<ProdCard
						key={product.id}
						productInfo={product}
						clicked={productClickedHandler}
					/>
				);
			});
		}

		if (dataSet.isLoading) {
			productsToDisplay = <Loader />;
		} else if (!dataSet.data.length) {
			productsToDisplay = <p>No results found</p>;
		} else if (dataSet.isError) {
			productsToDisplay = <p>Something went wrong ...</p>;
		} else {
			productsToDisplay = (
				<Fragment>
					<div className={classes.productsGrid}>
						{filteredProdList}
					</div>
					<div className={classes.paginationNav}>
						{!shouldSearch && (
							<Fragment>
								<GenericButton
									label={'< Previous Page'}
									clicked={fetchData.prevPage}
									isDisabled={fetchData.prevPageDisable}
								/>
								<GenericButton
									label={'Next Page >'}
									isDisabled={fetchData.nextPageDisable}
									clicked={fetchData.nextPage}
								/>
							</Fragment>
						)}
					</div>
				</Fragment>
			);
		}
	}
	return (
		<Fragment>
			<div className='utilMarTop_1 utilBigContainer'>
				{productsToDisplay}
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
		modalDisappeared: state.uiState.modalDisappeared,
		enteredSearchQuery:
			state.formState.searchForm.fields['searchQuery'].value,
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProdCards);

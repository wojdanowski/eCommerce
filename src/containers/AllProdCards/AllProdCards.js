import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import usePagination from './../../hooks/usePaginationReworked';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './AllProdCards.module.scss';
import addIdsToData from './../../utilities/addIdsToData';

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
	const maxPerPage = 5;
	const [isUpdated, setIsUpdated] = useState(false);

	let fetchData = usePagination(url, maxPerPage, useFetchApi, 'get');

	const prodData = {
		...fetchData,
		// data: {
		// 	...addIdsToData(fetchData.data),
		// },
	};

	useEffect(() => {
		if (!isUpdated) {
			fetchData.callFetchApi();
			setIsUpdated(true);
		}
	}, [isUpdated, fetchData]);

	const productClickedHandler = useCallback(
		(id) => {
			setSelectedProd(id);
			toggleModal();
		},
		[toggleModal]
	);

	let filteredProdList;
	if (!prodData.isLoading && prodData.data) {
		console.log(prodData.data);
		filteredProdList = prodData.data.map((product) => {
			return (
				<ProdCard
					key={product[0]}
					productInfo={product[1]}
					clicked={productClickedHandler}
				/>
			);
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
								clicked={prodData.prevPage}
								isDisabled={prodData.prevPageDisable}
							/>
							<GenericButton
								label={'Next Page >'}
								isDisabled={prodData.nextPageDisable}
								clicked={prodData.nextPage}
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

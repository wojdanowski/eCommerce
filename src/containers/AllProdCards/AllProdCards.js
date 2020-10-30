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

	let fetchData = usePagination(url, maxPerPage, useFetchApi, 'get');

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
	if (!fetchData.isLoading && fetchData.data) {
		filteredProdList = fetchData.data.map((product) => {
			return (
				<ProdCard
					key={product[0]}
					productInfo={{ ...product[1], id: product[0] }}
					clicked={productClickedHandler}
				/>
			);
		});
	}

	let modalProdContent = null;
	if (fetchData.isLoading) modalProdContent = <Loader />;
	if (selectedProd && props.modalVisible && fetchData.data) {
		let selectedProdData = fetchData.data.filter(
			(el) => el[0] === selectedProd
		)[0];
		console.log(selectedProdData);
		modalProdContent = (
			<ProductPage
				prodData={{ ...selectedProdData[1], id: selectedProd[0] }}
			/>
		);
	} else modalProdContent = <p>No product...</p>;

	return (
		<Fragment>
			<div className='utilBigContainer'>
				{fetchData.isError && <div>Something went wrong ...</div>}
				{fetchData.isLoading ? (
					<Loader />
				) : (
					<Fragment>
						<div className={classes.productsGrid}>
							{filteredProdList}
						</div>
						<div className={classes.paginationNav}>
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

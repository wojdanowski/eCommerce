import React, { Fragment, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import usePagination from './../../hooks/usePagination';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './AllProdCards.module.scss';
import addIdsToData from './../../utilities/addIdsToData';

import ProdCard from '../../components/ProductCard/ProdCard';
import GenericButton from '../../components/UI/Buttons/GenericButton/GenericButton';
import Loader from '../../components/UI/Loader/Loader';
import Modal from '../../components/UI/Modal/Modal';
import ProductPage from '../../components/ProductPage/ProductPage';

const AllProdCards = (props) => {
	const url = `https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"`;
	const [selectedProd, setSelectedProd] = useState(null);
	const { toggleModal } = props;

	let fetchData = usePagination(url, 16);

	const prodData = {
		...fetchData,
		data: {
			...addIdsToData(fetchData.data),
		},
	};

	const productClickedHandler = useCallback(
		(id) => {
			setSelectedProd(id);
			toggleModal();
		},
		[toggleModal]
	);

	let filteredProdList;
	if (!prodData.isLoading && prodData.data) {
		const prodList = Object.values(prodData.data);
		filteredProdList = prodList.map((product) => {
			return (
				<ProdCard
					key={product.id}
					productInfo={product}
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

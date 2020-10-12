import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as uiActionTypes from '../../store/actions/uiActions';
import classes from './AllProdCards.module.scss';
import ProdCard from './ProdCard/ProdCard';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';
import Loader from './../UI/Loader/Loader';
import useDataApi from './../../hooks/useFetchData';
import Modal from './../UI/Modal/Modal';
import ProductPage from './../ProductPage/ProductPage';

const AllProdCards = (props) => {
	const [pagination, setPagination] = useState('&limitToFirst=4');
	const [selectedProd, setSelectedProd] = useState(null);

	const query =
		'https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"';
	const prodData = useDataApi(query.concat(pagination));

	const getLastItem = (obj) => {
		return Object.keys(obj)[Object.keys(obj).length - 1];
	};
	const getFirstItem = (obj) => {
		return Object.keys(obj)[0];
	};

	const paginateHandler = (forward = true) => {
		let paginationProperties;
		if (forward) {
			paginationProperties = `&limitToFirst=4&startAt="${getLastItem(
				prodData.data
			)}"`;
			console.log(`moving forward`);
		} else {
			paginationProperties = `&limitToLast=4&endAt="${getFirstItem(
				prodData.data
			)}"`;
			console.log(`moving back`);
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
				{selectedProd && (
					<ProductPage prodData={prodData.data[selectedProd]} />
				)}
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

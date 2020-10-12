import React, { Fragment, useState } from 'react';
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
	const [query, setQuery] = useState(
		`https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"&limitToFirst=4`
	);
	const [selectedProd, setSelectedProd] = useState(null);
	// const [lastItem, setLastItem] = useState();
	// const [prevLastItem, setPrevLastItem] = useState();

	const prodData = useDataApi(query);

	const productClickedHandler = (id) => {
		setSelectedProd(id);
		props.toggleModal();
	};

	let filteredProdList;
	if (!prodData.isLoading && prodData.data) {
		console.log(prodData);
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
			}
		});
	}

	// let lastItem;
	// let prevLastItem;
	// if (prodData.data) {
	// 	prevLastItem = lastItem;
	// 	lastItem = Object.keys(prodData.data)[
	// 		Object.keys(prodData.data).length - 1
	// 	];
	// }

	// const paginateHandler = (forward = true) => {
	// 	let direction = '';
	// 	let item;
	// 	if (forward) {
	// 		direction = 'startAt';
	// 		item = lastItem;
	// 	} else {
	// 		direction = 'endAt';
	// 		item = prevLastItem;
	// 	}
	// 	console.log(`[MainPage] items`);
	// 	console.log(prevLastItem);
	// 	console.log(lastItem);
	// 	const paginationString = `&${direction}="${item}"`;
	// 	prodData.setUrl(query.concat(paginationString));
	// };

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
						{/* <div className={classes.paginationNav}>
							<GenericButton
								label={'< Previous Page'}
								clicked={() => props.paginateHandler(false)}
							/>
							<GenericButton
								label={'Next Page >'}
								clicked={() => props.paginateHandler()}
							/>
						</div> */}
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

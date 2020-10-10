import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as uiActionTypes from '../../store/actions/uiActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from './../../components/MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from './../../components/ProductCards/AllProdCards';
import useDataApi from './../../hooks/useFetchData';
import Loader from './../../components/UI/Loader/Loader';
import Modal from './../../components/UI/Modal/Modal';
import ProductPage from './../../components/ProductPage/ProductPage';
import axios from 'axios';

const MainPage = (props) => {
	const prodData = useDataApi(
		'https://ecommerceprodmockup.firebaseio.com/products.json'
	);

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	const dummyProd = {
		shortDescription: 'short description',
		fullDescription: 'test description',
		isSold: false,
		name: 'test name',
		oldPrice: getRandomInt(100) + 300,
		price: getRandomInt(300),
		thumb: 'https://source.unsplash.com/random/500x800',
		images: [
			'https://images.unsplash.com/photo-1600009514852-348eac2a1503?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
			'https://images.unsplash.com/photo-1599770792456-229af73c466e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
			'https://images.unsplash.com/photo-1600967608837-38d5e2b048f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
			'https://images.unsplash.com/photo-1602253580168-27e210a95a51?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
			'https://images.unsplash.com/photo-1599932904138-305485fdcee7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
		],
	};

	// useEffect(() => {
	// 	axios.post(
	// 		'https://ecommerceprodmockup.firebaseio.com/products.json',
	// 		dummyProd
	// 	);
	// }, []);

	const [selectedProd, setSelectedProd] = useState(null);

	const productClickedHandler = (id) => {
		setSelectedProd(id);
		props.toggleModal();
	};

	return (
		<Aux>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
			</div>
			<div className='utilBigContainer'>
				{prodData.isError && <div>Something went wrong ...</div>}
				{prodData.isLoading ? (
					<Loader />
				) : (
					<AllProdCards
						prodData={prodData.data}
						productClicked={productClickedHandler}
					/>
				)}
			</div>
			<Modal show={props.modalVisible} modalClosed={props.toggleModal}>
				{selectedProd && (
					<ProductPage prodData={prodData.data[selectedProd]} />
				)}
			</Modal>
		</Aux>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

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
	const [query, setQuery] = useState(
		`https://ecommerceprodmockup.firebaseio.com/products.json?orderBy="$key"&limitToFirst=4`
	);

	const [lastItem, setLastItem] = useState();
	const [prevLastItem, setPrevLastItem] = useState();

	const prodData = useDataApi(query);

	// let lastItem;
	// let prevLastItem;
	// if (prodData.data) {
	// 	prevLastItem = lastItem;
	// 	lastItem = Object.keys(prodData.data)[
	// 		Object.keys(prodData.data).length - 1
	// 	];
	// }

	const paginateHandler = (forward = true) => {
		let direction = '';
		let item;
		if (forward) {
			direction = 'startAt';
			item = lastItem;
		} else {
			direction = 'endAt';
			item = prevLastItem;
		}
		console.log(`[MainPage] items`);
		console.log(prevLastItem);
		console.log(lastItem);
		const paginationString = `&${direction}="${item}"`;
		prodData.setUrl(query.concat(paginationString));
	};

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	};

	// const dummyProd = {
	// 	shortDescription: 'short description',
	// 	fullDescription: 'test description',
	// 	isSold: false,
	// 	name: 'test name',
	// 	oldPrice: getRandomInt(100) + 300,
	// 	price: getRandomInt(300),
	// 	thumb: 'https://source.unsplash.com/random/500x800',
	// 	images: [
	// 		'https://images.unsplash.com/photo-1600009514852-348eac2a1503?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
	// 		'https://images.unsplash.com/photo-1599770792456-229af73c466e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
	// 		'https://images.unsplash.com/photo-1600967608837-38d5e2b048f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
	// 		'https://images.unsplash.com/photo-1602253580168-27e210a95a51?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
	// 		'https://images.unsplash.com/photo-1599932904138-305485fdcee7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
	// 	],
	// };
	const createMockup = async (iterator) => {
		await axios.post(
			'https://ecommerceprodmockup.firebaseio.com/products.json',
			{
				shortDescription: 'short description',
				fullDescription: 'test description',
				isSold: false,
				name: 'test name',
				oldPrice: getRandomInt(100) + 300,
				price: iterator,
				thumb: 'https://source.unsplash.com/random/500x800',
				images: [
					'https://images.unsplash.com/photo-1600009514852-348eac2a1503?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
					'https://images.unsplash.com/photo-1599770792456-229af73c466e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
					'https://images.unsplash.com/photo-1600967608837-38d5e2b048f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
					'https://images.unsplash.com/photo-1602253580168-27e210a95a51?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
					'https://images.unsplash.com/photo-1599932904138-305485fdcee7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=500',
				],
			}
		);
	};

	// useEffect(() => {
	// 	for (let i = 0; i < 20; i++) {
	// 		createMockup(i);
	// 	}
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
						paginate={paginateHandler}
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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as uiActionTypes from '../../store/actions/uiActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from './../../components/MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from './../../components/ProductCards/AllProdCards';
import useDataApi from './../../hooks/useFetchData';
import Loader from './../../components/UI/Loader/Loader';
import Modal from './../../components/UI/Modal/Modal';

const Main = (props) => {
	const prodData = useDataApi(
		'https://ecommerceprodmockup.firebaseio.com/products.json'
	);

	// const { data, isLoading, isError, doFetch}  = useDataApi(
	// 	'https://ecommerceprodmockup.firebaseio.com/products.json'
	// );
	const [selectedProd, setSelectedProd] = useState('');

	let prodctDetails = null;

	const productClickedHandler = (id) => {
		props.toggleModal();
		console.log(id);
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
				<p>prod info</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from './../../components/MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from './../../components/ProductCards/AllProdCards';
import useDataApi from './../../hooks/useFetchData';
import Loader from './../../components/UI/Loader/Loader';

const Main = (props) => {
	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		'https://ecommerceprodmockup.firebaseio.com/products.json'
	);

	return (
		<Aux>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
			</div>
			{isError && <div>Something went wrong ...</div>}
			<div className='utilBigContainer'>
				{isLoading ? <Loader /> : <AllProdCards prodData={data} />}
			</div>
		</Aux>
	);
};

export default Main;

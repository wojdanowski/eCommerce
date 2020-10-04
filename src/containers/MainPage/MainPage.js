import React from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from './../../components/MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from './../../components/ProductCards/AllProdCards';
import useDataApi from './../../hooks/useFetchData';

const Main = (props) => {
	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		'https://ecommerceprodmockup.firebaseio.com/products.json',
		{
			hits: [],
		}
	);

	const loadingScreen = <div> Loading... </div>;

	return (
		<Aux>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
			</div>
			{isError && <div>Something went wrong ...</div>}
			<div className='utilBigContainer'>
				{isLoading ? loadingScreen : <AllProdCards prodData={data} />}
			</div>
		</Aux>
	);
};

export default Main;

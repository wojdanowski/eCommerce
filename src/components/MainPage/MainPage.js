import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from '../MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from '../../containers/AllProdCards/AllProdCards';

const MainPage = (props) => {
	return (
		<Aux>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
				<AllProdCards />
			</div>
		</Aux>
	);
};

export default MainPage;

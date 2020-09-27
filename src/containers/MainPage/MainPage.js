import React from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import MainHeader from './../../components/MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from './../../components/ProductCards/AllProdCards';

const Main = (props) => {
	return (
		<Aux>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
			</div>

			<div className='utilBigContainer'>
				<AllProdCards />
			</div>
		</Aux>
	);
};

export default Main;

import React, { Fragment } from 'react';
import MainHeader from '../MainHeader/MainHeader';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import AllProdCards from '../../containers/AllProdCards/AllProdCards';

const MainPage = (props) => {
	return (
		<Fragment>
			<MainHeader />
			<div className='utilContainer'>
				<CategoriesBar />
				<AllProdCards />
			</div>
		</Fragment>
	);
};

export default MainPage;

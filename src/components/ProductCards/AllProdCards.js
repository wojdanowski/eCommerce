import React from 'react';
import classes from './AllProdCards.module.scss';
import ProdCard from './ProdCard/ProdCard';

const AllProdCards = () => {
	return (
		<div className={classes.productsGrid}>
			<ProdCard />
			<ProdCard />
			<ProdCard />
			<ProdCard />
			<ProdCard />
		</div>
	);
};

export default AllProdCards;

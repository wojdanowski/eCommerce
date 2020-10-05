import React from 'react';
import classes from './AllProdCards.module.scss';
import ProdCard from './ProdCard/ProdCard';

const AllProdCards = (props) => {
	// if (props.prodData) {
	// 	const products = props.prodData;
	// }
	let prodList;
	if (props.prodData) {
		prodList = Object.values(props.prodData).map((product) => (
			<ProdCard key={product.id} productInfo={product} />
		));
	}

	return <div className={classes.productsGrid}>{prodList}</div>;
};

export default AllProdCards;

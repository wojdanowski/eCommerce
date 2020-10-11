import React from 'react';
import classes from './AllProdCards.module.scss';
import ProdCard from './ProdCard/ProdCard';

const AllProdCards = (props) => {
	let prodList;
	if (props.prodData) {
		prodList = Object.values(props.prodData).map((product, index) => (
			<ProdCard
				key={product.id}
				productInfo={product}
				clicked={props.productClicked}
			/>
		));
	}

	return <div className={classes.productsGrid}>{prodList}</div>;
};

export default AllProdCards;

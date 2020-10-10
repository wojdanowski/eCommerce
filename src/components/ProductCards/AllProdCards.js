import React from 'react';
import classes from './AllProdCards.module.scss';
import ProdCard from './ProdCard/ProdCard';

const AllProdCards = (props) => {
	let prodList;
	if (props.prodData) {
		const prodIds = Object.keys(props.prodData);
		prodList = Object.values(props.prodData).map((product, index) => (
			<ProdCard
				key={prodIds[index]}
				productInfo={product}
				clicked={props.productClicked}
				prodId={prodIds[index]}
			/>
		));
	}

	return <div className={classes.productsGrid}>{prodList}</div>;
};

export default AllProdCards;

import React, { Fragment } from 'react';
import classes from './AllProdCards.module.scss';
import ProdCard from './ProdCard/ProdCard';
import GenericButton from './../UI/Buttons/GenericButton/GenericButton';

const AllProdCards = (props) => {
	let prodList;
	let filterProdList;
	if (props.prodData) {
		prodList = Object.values(props.prodData);
		filterProdList = prodList.map((product, index) => {
			if (index !== prodList.length - 1) {
				return (
					<ProdCard
						key={product.id}
						productInfo={product}
						clicked={props.productClicked}
					/>
				);
			}
		});
	}

	return (
		<Fragment>
			<div className={classes.productsGrid}>{filterProdList}</div>
			<div className={classes.paginationNav}>
				<GenericButton
					label={'< Previous Page'}
					clicked={() => props.paginate(false)}
				/>
				<GenericButton
					label={'Next Page >'}
					clicked={() => props.paginate()}
				/>
			</div>
		</Fragment>
	);
};

export default AllProdCards;

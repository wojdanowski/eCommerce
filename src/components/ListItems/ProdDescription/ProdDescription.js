import React from 'react';

import classes from './ProdDescription.module.scss';

const ProdDescription = (props) => {
	let prodId = null;
	if (props.isAdmin && props.itemData.id) {
		prodId = <p>ID: {`${props.itemData.id.slice(0, 8)}...`}</p>;
	}

	return (
		<div className={classes.descriptionContainer}>
			<div className={classes.imgContainer}>
				{props.itemData.images ? (
					<img
						className={classes.prodImg}
						src={props.itemData.images[0]}
						alt='prodImg'
					/>
				) : (
					<p>No Image!</p>
				)}
			</div>
			<div className={classes.descriptionArea}>
				<div className={classes.shortDescAndName}>
					<h3>{props.itemData.name}</h3>
					<span className={classes.shortDescription}>
						<p>{props.itemData.shortDescription}</p>
					</span>
				</div>
				{prodId}
				<div className={classes.priceBox}>
					<p>Price: {(props.itemData.price * 1).toFixed(2)} USD</p>
				</div>
			</div>
		</div>
	);
};

export default ProdDescription;

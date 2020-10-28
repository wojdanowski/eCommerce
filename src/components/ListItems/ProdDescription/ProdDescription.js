import React, { Fragment } from 'react';

import classes from './ProdDescription.module.scss';

const ProdDescription = (props) => {
	return (
		<Fragment>
			<div className={classes.imgContainer}>
				<img
					className={classes.prodImg}
					src={props.itemData.thumb}
					alt='prodImg'
				/>
			</div>
			<div className={classes.descriptionArea}>
				<div>
					<h3>{props.itemData.name}</h3>
					<span className={classes.shortDescription}>
						<p>{props.itemData.shortDescription}</p>
					</span>
				</div>
				<div className={classes.priceBox}>
					<p>
						Price: {parseInt(props.itemData.price, 10).toFixed(2)}{' '}
						USD
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default ProdDescription;
import React from 'react';
import classes from './ProdCard.module.scss';
import GenericButton from './../../UI/Buttons/GenericButton/GenericButton';

const ProdCard = (props) => {
	const soldTag = (
		<div className={classes.soldTag}>
			<span>Sold</span>
		</div>
	);
	return (
		<div className={classes.productCard}>
			{props.productInfo.isSold && soldTag}
			<div
				className={classes.prodImgContainer}
				onClick={() => props.clicked(props.productInfo.id)}
			>
				<img
					className={classes.productImg}
					src={props.productInfo.thumb}
					alt='prodImg'
				/>
			</div>
			<div className={classes.prodDescription}>
				<h4>{props.productInfo.name}</h4>
				<div className={classes.productPrice}>
					<span className={classes.beforePrice}>
						{props.productInfo.old_price} zł
					</span>
					<span className={classes.newPrice}>
						{props.productInfo.price} zł
					</span>
				</div>
				<GenericButton label='buy' />
			</div>
		</div>
	);
};

export default ProdCard;

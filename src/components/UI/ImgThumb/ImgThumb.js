import React from 'react';
import classes from './ImgThumb.module.scss';
import IconButton from './../Buttons/IconButton/IconButton';
import { FiTrash2 } from 'react-icons/fi';
const ImgThumb = (props) => {
	// const isRemovedClass = props.isRemoved ? classes.isRemoved : null;
	return (
		<div className={`${classes.thumb}`}>
			<div className={classes.thumbInner}>
				<img
					src={props.imgSrc}
					className={classes.img}
					alt={props.altText ? props.altText : 'thumbImg'}
				/>
				<IconButton
					icon={<FiTrash2 />}
					clicked={props.clicked}
					isRemoved={props.isRemoved}
				/>
			</div>
		</div>
	);
};

export default ImgThumb;

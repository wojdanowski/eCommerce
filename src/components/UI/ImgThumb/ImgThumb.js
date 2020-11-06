import React from 'react';
import classes from './ImgThumb.module.scss';

const ImgThumb = (props) => {
	return (
		<div className={classes.thumb}>
			<div className={classes.thumbInner} onClick={props.clicked}>
				<img
					src={props.imgSrc}
					className={classes.img}
					alt={props.altText ? props.altText : 'thumbImg'}
				/>
			</div>
		</div>
	);
};

export default ImgThumb;

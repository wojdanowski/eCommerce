import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => {
	return (
		<div className={classes.container}>
			<div className={classes.ldsRing}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;

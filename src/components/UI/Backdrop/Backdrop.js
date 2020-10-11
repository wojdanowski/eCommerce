import React, { Fragment } from 'react';

import classes from './Backdrop.module.scss';

const Backdrop = (props) => {
	let addClass = null;
	props.isTransparent && (addClass = classes.transparent);

	return (
		<Fragment>
			{props.show ? (
				<div
					className={`${classes.Backdrop} ${addClass}`}
					onClick={props.clicked}
				></div>
			) : null}
		</Fragment>
	);
};

export default Backdrop;

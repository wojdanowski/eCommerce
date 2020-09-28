import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
	return (
		<div className={`${classes.footerContainer} utilContainer`}>
			<p>&copy; 2020 Sebastian Wojdanowski</p>
		</div>
	);
};

export default Footer;

import React from 'react';
import classes from './MainHeader.module.scss';
import logoImg from '../../assets/img/logo.png';

const MainHeader = () => {
	return (
		<header className={classes.mainHeader}>
			<img src={logoImg} alt='logo' />
			<h1>Vintage Lump</h1>
		</header>
	);
};

export default MainHeader;
